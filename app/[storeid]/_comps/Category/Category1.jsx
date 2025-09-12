import Link from "next/link";
import React from "react";
import { getStoreData } from "../../Storedata";

async function Category1({ storeid, collection, showheader = true }) {
  const storedata = await getStoreData(storeid);
  const collectiondata = storedata?.collections.find(
    (item) => item?.name == collection
  );

  return (
    <div className="">
      {showheader && (
        <div className="flex items-center justify-between px-2 md:px-10">
          <h2 className="text-2xl font-tenor">{collection}</h2>
          <Link
            href={`/${storeid}/collections`}
            className="text-[var(--secondary)]"
          >
            View all
          </Link>
        </div>
      )}

      <div className="flex items-center gap-2 overflow-x-scroll hidescroll mt-2 px-2 md:px-10">
        {collectiondata?.subcat?.map((item, i) => (
          <Link
            key={i}
            href={`/${storeid}/collections?${collection}=${item?.name}`}
            className="bg-gray-100 px-5 py-2 rounded-full whitespace-nowrap"
          >
            {item?.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category1;
