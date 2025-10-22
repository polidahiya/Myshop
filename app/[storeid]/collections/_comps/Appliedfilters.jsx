"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

function Appliedfilterscomp({ appliedfilters }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const generateHref = (category) => {
    const params = new URLSearchParams(searchParams.toString());

    // find key by iterating URLSearchParams entries
    let keyToDelete = null;
    for (const [key, value] of params.entries()) {
      if (value === category) {
        keyToDelete = key;
        break;
      }
    }

    if (keyToDelete) {
      params.delete(keyToDelete);
    }

    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      {appliedfilters.length > 0 && (
        <div className="w-full flex flex-wrap gap-2 mt-1">
          {appliedfilters.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full p-1 pl-5 bg-gray-100"
            >
              <span className="">{item}</span>
              <Link
                prefetch={false}
                href={generateHref(item)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white hover:text-white hover:bg-gray-600 duration-200"
              >
                X
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Appliedfilterscomp;
