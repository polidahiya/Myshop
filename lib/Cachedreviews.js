"use server";
import { getcollection } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";

// reviews
export async function Cachedreviews(productid) {
  const quersies = {
    "5stars": { verified: true, star: 5 },
  };
  return unstable_cache(
    async () => {
      const { reviewscollection } = await getcollection();
      const reviewslist = await reviewscollection
        .find(quersies[productid] || { verified: true, productid })
        .toArray();

      reviewslist.forEach((item) => {
        item._id = item._id.toString();
      });
      return reviewslist;
    },
    [`reviews-${productid}`],
    { revalidate: CACHE_TIME, tags: [`reviews-${productid}`] }
  )();
}
