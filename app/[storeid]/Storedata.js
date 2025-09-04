"use server";
import { unstable_cache } from "next/cache";
import { getcollection } from "@/lib/db";


export async function getStoreData(storeId) {
  return unstable_cache(
    async () => {
      const { storescollection, ObjectId } = await getcollection();
      const query = ObjectId.isValid(storeId)
        ? { _id: new ObjectId(storeId) }
        : { slug: storeId };

      const storedata = await storescollection.findOne(query);
      if (storedata) storedata._id = storedata._id.toString();
      return storedata;
    },
    [`store-${storeId}`],
    {
      revalidate: 7 * 24 * 60 * 60,
      tags: [`store-${storeId}`],
    }
  )();
}
