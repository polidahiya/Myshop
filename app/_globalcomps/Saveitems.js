"use server";
import Verification from "@/lib/verification";
import { getcollection } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";
import { revalidateTag } from "next/cache";

export async function Saveitems(type = "Store", id) {
  try {
    const tokenres = await Verification("public");
    if (!tokenres?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { userscollection, ObjectId } = await getcollection();
    const user = await userscollection.findOne({ email: tokenres.email });
    if (!user) return { status: 404, message: "User not found" };

    const types = {
      Store: "savedstores",
      Product: "savedproducts",
    };

    const field = types[type];
    if (!field) return { status: 400, message: "Invalid type" };

    const objectId = new ObjectId(id);
    const alreadySaved = user[field]?.some(
      (storedId) => storedId.toString() === id
    );

    const update = alreadySaved
      ? { $pull: { [field]: objectId } }
      : { $addToSet: { [field]: objectId } };

    await userscollection.updateOne({ email: tokenres.email }, update);

    revalidateTag(`saveditems-${tokenres.email}`);
    revalidateTag(`userdata-${tokenres.email}`);

    return { status: 200, message: alreadySaved ? "Removed" : "Saved" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Server Error" };
  }
}

export async function Getsaveditems() {
  try {
    const tokenres = await Verification("public");
    if (!tokenres?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    return unstable_cache(
      async () => {
        const { userscollection } = await getcollection();

        const pipeline = [
          { $match: { email: tokenres.email } },

          // Join with stores collection
          {
            $lookup: {
              from: "stores",
              localField: "savedstores",
              foreignField: "_id",
              as: "savedstoresData",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    storename: 1,
                    storetype: 1,
                    Pincode: 1,
                    logo: 1,
                  },
                },
              ],
            },
          },

          // Join with products collection
          {
            $lookup: {
              from: "Products",
              localField: "savedproducts",
              foreignField: "_id",
              as: "savedproductsData",
              pipeline: [
                {
                  $project: {
                    _id: 1,
                    name: 1,
                    price: 1,
                    storeid: 1,
                    images: 1,
                  },
                },
              ],
            },
          },

          {
            $project: {
              _id: 0,
              savedstoresData: 1,
              savedproductsData: 1,
            },
          },
        ];

        const [user] = await userscollection.aggregate(pipeline).toArray();
        if (!user) return { status: 404, message: "User not found" };
        user?.savedstoresData.forEach(
          (item) => (item._id = item._id.toString())
        );
        user?.savedproductsData.forEach(
          (item) => (item._id = item._id.toString())
        );

        return {
          status: 200,
          savedstores: user.savedstoresData,
          savedproducts: user.savedproductsData,
        };
      },
      [`saveditems-${tokenres.email}`],
      {
        revalidate: CACHE_TIME,
        tags: [`saveditems-${tokenres.email}`],
      }
    )();
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Server Error" };
  }
}
