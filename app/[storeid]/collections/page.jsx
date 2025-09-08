import React from "react";
import Ads from "./_comps/Ads";
import Productcard from "./_comps/Productcard/Productcard";
import Newbutton from "./_comps/Newbutton";
import Filters from "./_comps/Filters/Filters";
import Heading from "./_comps/Heading/Heading";
import { getStoreData } from "../Storedata";
import { Cachedproducts } from "../Cachedproducts";
import { Authfn } from "@/lib/auth";

async function page({ params, searchParams }) {
  const { storeid } = await params;
  const { isadmin } = await Authfn(storeid);
  const allsearchparams = await searchParams;
  const storedata = await getStoreData(storeid);
  const rawproducts = await Cachedproducts(storeid);
  //

  const allfilternames = storedata?.collections.map((item) => item?.name);

  // filters that are actually present in searchParams
  const appliedfilters = allfilternames
    .filter((item) => allsearchparams[item])
    .map((item) => allsearchparams[item]);

  const filteredproducts = rawproducts.filter((product) =>
    appliedfilters.every((filter) =>
      product.collections.some((col) => col === filter)
    )
  );

  const products = appliedfilters.length > 0 ? filteredproducts : rawproducts;

  //
  return (
    <div className="px-2 md:px-10">
      <Heading />
      <div className="flex gap-5">
        <Filters
          allsearchparams={allsearchparams}
          collections={storedata?.collections}
        />
        <div className="h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10">
          <Newbutton storeid={storeid} />
          {products.map((product, i) => (
            <React.Fragment key={i}>
              <Productcard
                storeid={storeid}
                product={product}
                isadmin={isadmin}
              />
              <Ads i={i} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
