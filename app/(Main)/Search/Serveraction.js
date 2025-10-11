"use server";
import { getcollection } from "@/lib/db";

export async function Searchproducts(query) {
  try {
    const { storescollection, ObjectId } = await getcollection();
    const regex = new RegExp(query, "i");
    const orConditions = [
      { storename: regex },
      { storetype: regex },
      { Pincode: regex },
    ];

    if (ObjectId.isValid(query)) {
      orConditions.push({ _id: new ObjectId(query) });
    }

    const res = await storescollection
      .find(
        {
          $or: orConditions,
        },
        {
          projection: {
            home: 0,
            collections: 0,
          },
        }
      )
      .toArray();

    res.forEach((store) => {
      store._id = store._id.toString();
    });

    return {
      status: 200,
      data: res || [],
      message: "Search results",
    };
  } catch (error) {
    return {
      status: 500,
      data: [],
      message: "Server error!",
    };
  }
}
