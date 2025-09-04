"use server";
import { uploadImage, Deleteiamgefromurl } from "./Cloudinary";
export const Addimages = async (formdata, foldername = "Mystore") => {
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

export const Deleteimages = async (images, foldername = "Mystore") => {
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
