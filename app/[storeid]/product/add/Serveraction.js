"use server";
import { Deleteiamgefromurl } from "@/lib/Cloudinary";
import Verification from "@/lib/verification";
import { getcollection } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const Addproduct = async (data, deletedimages) => {
  try {
    const tokenres = await Verification("public");
    if (!tokenres?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { Productscollection, ObjectId } = await getcollection();

    // delete previous images
    deletedimages.forEach(async (image) => {
      await Deleteiamgefromurl(image, "Mystore/Products");
    });

    const date = new Date().getTime();
    const storeid = tokenres.storeid;

    // Add to MongoDB
    if (data._id) {
      // to update a product
      const { _id, ...updateFields } = data;
      await Productscollection.updateOne(
        { _id: new ObjectId(data._id), storeid },
        { $set: { ...updateFields, lastupdated: date } }
      );
      revalidateTag(`products-${storeid}`);
      return { status: 200, message: "Updated successfully" };
    } else {
      // to add a product
      await Productscollection.insertOne({
        ...data,
        storeid,
        lastupdated: date,
        createdat: date,
      });
      revalidateTag(`products-${storeid}`);
      return { status: 200, message: "Added successfully" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
};

export const Deleteproduct = async (pid) => {
  try {
    // Verify user
    const tokenres = await Verification("public");
    if (!tokenres?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const storeid = tokenres.storeid;

    const { Productscollection, ObjectId } = await getcollection();

    // Find product
    const product = await Productscollection.findOne({
      _id: new ObjectId(pid),
    });
    if (!product) {
      return { status: 404, message: "Product not found" };
    }

    // Check ownership
    if (product.storeid !== storeid) {
      return { status: 403, message: "Unauthorized" };
    }

    // Collect all image URLs (main + option images)
    const imageUrls = [
      ...(product.images || []),
      ...(product.options?.flatMap((opt) => opt?.options?.images || []) || []),
    ];

    // Delete images in parallel
    if (imageUrls.length > 0) {
      await Promise.all(
        imageUrls.map((url) => Deleteiamgefromurl(url, "Mystore/Products"))
      );
    }

    // Delete from MongoDB
    await Productscollection.findOneAndDelete({ _id: new ObjectId(pid) });

    // Revalidate cache/tags
    await revalidateTag(`products-${storeid}`);

    return { status: 200, message: "Deleted successfully" };
  } catch (error) {
    console.error("Deleteproduct error:", error);
    return { status: 500, message: "Server Error" };
  }
};

export const Getproduct = async (pid) => {
  try {
    const tokenres = await Verification("public");
    if (!tokenres?.verified) {
      return { status: 400, message: "Invalid user" };
    }
    const { Productscollection, ObjectId } = await getcollection();
    const productres = await Productscollection.findOne({
      _id: new ObjectId(pid),
    });

    // check if the user is admin
    if (productres?.storeid !== tokenres.storeid)
      return { status: 400, message: "Invalid user" };
    // convert _id to string
    productres._id = productres._id.toString();

    return { status: 200, data: productres };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};
