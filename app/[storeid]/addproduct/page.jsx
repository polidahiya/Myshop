import React from "react";
import Clientpage from "./Clientpage";

async function page({ searchParams }) {
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

  {
    /* 
    clothes furniture beautyparlour shoes
    product name
    price
    mrp
    category
    images
    description
    options
     */
  }

  return <Clientpage productdata={productdata} />;
}

export default page;
