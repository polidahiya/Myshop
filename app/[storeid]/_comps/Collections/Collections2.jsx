import Link from "next/link";
import React from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { testimage } from "@/lib/data";

async function Category1({
  storeid,
  collection,
  showheader = true,
  Selectedcollection,
}) {
  return (
    <div className="">
      {showheader && (
        <div className="flex items-center justify-between px-2 md:px-10">
          <h2 className="text-2xl font-tenor">{collection}</h2>
          <Link
            href={`/${storeid}/collections`}
            className="text-[var(--usertheme)]"
          >
            View all
          </Link>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 md:grid-cols-9 mt-2 px-2 md:px-10">
        {Selectedcollection?.subcat?.slice(0, 9)?.map((item, i) => (
          <Link
            key={i}
            href={`/${storeid}/collections?${encodeURIComponent(
              collection
            )}=${encodeURIComponent(item?.name)}`}
            className="block"
          >
            <Nextimage
              src={item?.image || testimage}
              alt={item?.name}
              width={200}
              height={200}
              className="w-full aspect-square object-cover rounded-xl lg:rounded-2xl"
            />
            <p className="mt-2 line-clamp-1 text-center">{item?.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category1;
