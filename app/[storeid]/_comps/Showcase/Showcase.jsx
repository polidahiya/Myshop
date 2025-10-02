import React from "react";
import { Cachedproducts } from "../../Cachedproducts";

async function Showcase({ storeid, device, Component, compProps }) {
  const items = compProps?.items;
  const allproducts = await Cachedproducts(storeid);
  const products = allproducts.filter((p) => items.includes(p._id));

  return (
    <div className="py-2 md:py-5">
      <Component
        storeid={storeid}
        device={device}
        {...compProps}
        products={products}
      />
    </div>
  );
}

export default Showcase;
