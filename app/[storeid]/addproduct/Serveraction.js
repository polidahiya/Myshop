"use server";
import { Deleteiamgefromurl, uploadImage } from "@/lib/Cloudinary";
import Verification from "@/lib/verification";
import { getcollection } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const Addproduct = async (data, deletedimages) => {
  try {
    const res = await Verification("Products_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { Productscollection, ObjectId } = await getcollection();

    // delete previous images
    deletedimages.forEach(async (image) => {
      await Deleteiamgefromurl(image, "Altorganizer/products");
    });

    const date = new Date().getTime();

    // Add to MongoDB
    if (data._id) {
      // to update a product
      const { _id, ...updateFields } = data;
      await Productscollection.updateOne(
        { _id: new ObjectId(data._id) },
        { $set: { ...updateFields, lastupdated: date } }
      );
      await revalidateTag();
      return { status: 200, message: "Updated successfully" };
    } else {
      // to add a product
      await Productscollection.insertOne({ ...data, lastupdated: date });
      await revalidateTag();
      return { status: 200, message: "Added successfully" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
};

export const Deleteproduct = async (variants, id) => {
  try {
    const res = await Verification("Products_permission");
    if (!res?.verified) {
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

export const Addimages = async (
  formdata,
  foldername = "Altorganizer/products"
) => {
  try {
    const arrayBuffer = await formdata.get("image").arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const cloudinaryres = await uploadImage(buffer, foldername);
    const imageurl = cloudinaryres.secure_url;

    return { status: 200, message: "successfully", imageurl };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};

export const Deleteimages = async (
  images,
  foldername = "Altorganizer/products"
) => {
  try {
    images.forEach(async (image) => {
      await Deleteiamgefromurl(image, foldername);
    });
    return { status: 200, message: "Cleanup successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};
