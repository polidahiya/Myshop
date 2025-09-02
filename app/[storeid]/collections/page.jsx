import React from "react";
import Ads from "./_comps/Ads";
import Productcard from "./_comps/Productcard/Productcard";
import Newbutton from "./_comps/Newbutton";
import Filters from "./_comps/Filters/Filters";
import Heading from "./_comps/Heading/Heading";

async function page({ params, searchParams }) {
  const { storeid } = await params;
  const allsearchparams = await searchParams;
  return (
    <div className="px-2 md:px-10">
      <Heading />
      <div className="flex gap-5">
        <Filters allsearchparams={allsearchparams} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10">
          <Newbutton storeid={storeid} />
          {new Array(20).fill(null).map((item, i) => (
            <React.Fragment key={i}>
              <Productcard storeid={storeid} />
              <Ads i={i} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
