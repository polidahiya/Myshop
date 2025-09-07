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

export const Deleteproduct = async (variants, id) => {
  try {
    const tokenres = await Verification("Products_permission");
    if (!tokenres?.verified) {
      return { status: 400, message: "Invalid user" };
    }
    const { Productscollection, ObjectId } = await getcollection();

    if (variants) {
      for (const item of variants) {
        for (let j = 0; j < item.images.length; j++) {
          const url = item.images[j];
          await Deleteiamgefromurl(url, "Altorganizer/products");
        }
      }
    }

    // delete form mongodb
    await Productscollection.findOneAndDelete({ _id: new ObjectId(id) });
    await revalidateTag();
    return { status: 200, message: "Deleted successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};
