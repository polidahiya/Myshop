import React from "react";
import Clientpage from "./Clientpage";
import { getStoreData } from "../../Storedata";

async function page({ params, searchParams }) {
  const { storeid } = await params;
  const storedata = await getStoreData(storeid);
  const { edit, copy } = await searchParams;
  let productdata = null;
  if (edit || copy) {
    const res = await Roomsearchproducts("pid", edit || copy);
    if (res?.status == 200) {
      if (edit) {
        productdata = res?.data[0];
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
