"use server";
import { getcollection } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";

export async function Cachedproducts(storeid) {
  return unstable_cache(
    async () => {
      const { Productscollection } = await getcollection();
      const query = { storeid };
      const productsList = await Productscollection.find(query).toArray();
      productsList.forEach((item) => {
        item._id = item._id.toString();
      });
      return productsList;
    },
    [`products-${storeid}`],
    { revalidate: CACHE_TIME, tags: [`products-${storeid}`] }
  )();
}
