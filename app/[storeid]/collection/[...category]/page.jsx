import React from "react";
import Ads from "./_comps/Ads";
import Productcard from "./_comps/Productcard/Productcard";
import Newbutton from "./_comps/Newbutton";

async function page({ params }) {
  const { storeid } = await params;
  return (
    <div className="px-2 md:px-10">
      <div className="py-10">
        <h1 className="text-2xl font-bold">Collection</h1>
        <p>Home / furniture / sofa</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-10">
        <Newbutton storeid={storeid} />
        {new Array(20).fill(null).map((item, i) => (
          <React.Fragment key={i}>
            <Productcard storeid={storeid}/>
            <Ads i={i} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default page;
