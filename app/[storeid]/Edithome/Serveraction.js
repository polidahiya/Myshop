"use server";
import Verification from "@/lib/verification";
import { getcollection } from "@/lib/db";
import { getStoreData } from "../Storedata";
import { Deleteimages } from "@/lib/Addordeleteimages";
import { revalidateTag } from "next/cache";

export const Updatehome = async (data, add, at, deletedimages) => {
  try {
    const tokenres = await Verification("public");
    if (!tokenres?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    if (deletedimages && deletedimages.length > 0)
      await Deleteimages(deletedimages, "Mystore");

    const storeid = tokenres.storeid;

    const { storescollection, ObjectId } = await getcollection();

    const storedata = await getStoreData(storeid);
    const homedata = storedata?.home || [];

    if (add) {
      homedata.splice(at, 0, data);
    } else {
      homedata.splice(at, 1, data);
    }

    await storescollection.updateOne(
      { _id: new ObjectId(storeid) },
      {
        $set: {
          home: homedata,
          lastupdated: new Date(),
        },
      }
    );
    revalidateTag(`store-${storeid}`);
    return {
      status: 200,
      message: "Update successfully",
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};

export const Deletehomecomp = async (id) => {
  try {
    const tokenres = await Verification("public");
    if (!tokenres?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const storeid = tokenres.storeid;
    const { storescollection, ObjectId } = await getcollection();

    const storedata = await getStoreData(storeid);
    const homedata = storedata?.home || [];

    // delete images
    const selectedcomp = homedata[id];
    if (
      selectedcomp &&
      (selectedcomp.category == "Slider" || selectedcomp.category == "Banner")
    ) {
      const images = [];
      selectedcomp.props.items.forEach((item) => {
        images.push(item.img);
      });

      await Deleteimages(images, "Mystore");
    }

    homedata.splice(id, 1);
    await storescollection.updateOne(
      { _id: new ObjectId(storeid) },
      {
        $set: {
          home: homedata,
          lastupdated: new Date(),
        },
      }
    );

    revalidateTag(`store-${storeid}`);

    return {
      status: 200,
      message: "Delete successfully",
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};
