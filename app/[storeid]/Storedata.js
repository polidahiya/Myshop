"use server";
import { unstable_cache } from "next/cache";
import { getcollection } from "@/lib/db";
import { CACHE_TIME } from "@/lib/data";

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
      revalidate: CACHE_TIME,
      tags: [`store-${storeId}`],
    }
  )();
}
