import React from "react";
import Productcard from "../../collections/_comps/Productcard/Productcard";

async function Showcase1({ storeid, title = "", products = [] }) {
  return (
    <div className="">
      <div className="flex items-center justify-between px-2 md:px-10">
        <h2 className="text-2xl font-tenor">{title}</h2>
      </div>
      <div className="flex items-center gap-2 overflow-x-scroll hidescroll mt-2 px-2 md:px-10">
        {products.map((product, i) => {
          return (
            <div key={i} className="max-w-96 w-full shrink-0 ">
              <Productcard
                storeid={storeid}
                product={product}
                isadmin={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Showcase1;
