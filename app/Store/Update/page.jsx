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
  return <Clientpage storedata={storedata} storeid={tokenres?.storeid} />;
}

export default page;
