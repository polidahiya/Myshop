import React from "react";
import Clientpage from "./Clientpage";
import { getStoreData } from "../../Storedata";
import { Getproduct } from "./Serveraction";
import { Authfn } from "@/lib/auth";
import { notFound } from "next/navigation";

async function page({ params, searchParams }) {
  const { storeid } = await params;
  const storedata = await getStoreData(storeid);
  const { isadmin } = await Authfn(storeid);
  const { edit, copy } = await searchParams;
  if (!isadmin) notFound();
  let productdata = null;
  
  if (edit || copy) {
    const res = await Getproduct(edit || copy);
    if (res?.status == 200) {
      if (edit) {
        productdata = res?.data;
      }
      if (copy) {
        const data = res?.data[0];
        delete data._id;
        data.sku = "";
        data.variants.forEach((variant) => {
          variant.images = [];
        });
        data.moreoptions.forEach((option) => {
          option.options.forEach((item) => (item.image = []));
        });
        productdata = data;
      }
    }
  }
  return (
    <Clientpage
      productdata={productdata}
      collections={storedata?.collections.flatMap((cat) =>
        cat.subcat.map((subcat) => subcat.name)
      )}
    />
  );
}

export default page;
