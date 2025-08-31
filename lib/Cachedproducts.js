"use server";
import { getcollection } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";

export const Cachedproducts = unstable_cache(
  async () => {
    const { Productscollection } = await getcollection();
    const productsList = await Productscollection.find().toArray();
    productsList.forEach((item) => {
      item._id = item._id.toString();
    });
    return productsList;
  },
  ["products"],
  { revalidate: CACHE_TIME, tags: ["products"] }
);
