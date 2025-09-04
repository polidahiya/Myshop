import React from "react";
import Verification from "@/lib/verification";
import { notFound } from "next/navigation";
import { getStoreData } from "@/app/[storeid]/Storedata";
import Clientpage from "./Clientpage";

async function page() {
  const tokenres = await Verification("public");
  if (!tokenres?.verified || !tokenres?.storeid) {
    notFound();
  }
  const storedata = await getStoreData(tokenres?.storeid);
  storedata.collections = {
    Gender: {
      Mens: {},
      Womens: {},
      Kids: {},
    },
    Sizes: {
      "size 1 (35)": {},
      "size 2 (36)": {},
      "size 3 (37)": {},
      "size 4 (38)": {},
      "size 5 (39)": {},
      "size 6 (40)": {},
      "size 7 (41)": {},
      "size 8 (42)": {},
      "size 9 (43)": {},
      "size 10 (44)": {},
      "size 11 (45)": {},
      "size 12 (46)": {},
    },
    Types: {
      Sneakers: {},
      "Running Shoes": {},
      "Casual Shoes": {},
      "Formal Shoes": {},
      Loafers: {},
      Boots: {},
      Sandals: {},
      Slippers: {},
      "Flip-Flops": {},
      Heels: {},
      "Sports Shoes": {},
      "Ethnic Footwear": {},
    },
  };
  return <Clientpage storedata={storedata} />;
}

export default page;
