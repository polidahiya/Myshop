import Link from "next/link";
import React from "react";

function Category1({ storeid }) {
  return (
    <div className="px-2 md:px-10">
      <h2 className="text-2xl font-tenor">Categories</h2>
      <div className="flex items-center gap-2 overflow-x-scroll hidescroll mt-2">
        {new Array(10).fill(null).map((item, i) => (
          <Link
            key={i}
            href={`/${storeid}/collections?Gender=Men`}
            className="bg-gray-100 px-5 py-2 rounded-full"
          >
            Category {i}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category1;
