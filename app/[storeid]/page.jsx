import React from "react";
import { getStoreData } from "./Storedata";
import { Authfn } from "@/lib/auth";
import CategoriesGrid from "./_comps/Category/Category1";

async function page({ params }) {
  const { storeid } = await params;
  const storedata = await getStoreData(storeid);

  return (
    <div className="space-y-5 md:space-y-10">
      <CategoriesGrid storeid={storeid} />
    </div>
  );
}

export default page;
