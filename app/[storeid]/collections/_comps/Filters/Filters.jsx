"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AppContextfn } from "@/app/Context";
import { RxCross2 } from "react-icons/rx";

function Sidemenu({ allsearchparams, collections }) {
  const { openfilter, setopenfilter } = AppContextfn();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const generateHref = (category, subcat) => {
    const params = new URLSearchParams(searchParams.toString());
    if (subcat == "All") {
      params.delete(category);
    } else {
      params.set(category, subcat);
    }
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div
      className={`fixed top-0 left-0 shrink-0 lg:static w-full h-dvh lg:h-auto bg-black/10 lg:bg-transparent z-40 lg:z-0 backdrop-blur-xs ${
        openfilter
          ? "opacity-100 lg:opacity-0 lg:w-0 lg:overflow-hidden"
          : "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto lg:w-auto"
      } duration-300`}
    >
      <div
        className={`relative h-full w-80 lg:w-72 z-10 bg-white lg:bg-transparent flex flex-col ${
          openfilter
            ? "translate-x-0 lg:-translate-x-full"
            : "-translate-x-full lg:translate-x-0"
        } duration-300`}
      >
        <div className="flex items-center py-2 lg:hidden h-16 shadow-md z-10">
          <div className="flex-1"></div>
          <div className="flex-1 text-2xl text-center font-tenor">Filters</div>
          <div className="flex-1 flex justify-end">
            <button
              className="text-3xl h-10 aspect-square flex items-center justify-center"
              onClick={() => setopenfilter(false)}
            >
              <RxCross2 />
            </button>
          </div>
        </div>
        <div className="h-full space-y-2 overflow-y-scroll hidescroll lg:overflow-y-visible p-2 lg:p-0">
          {collections.map(({ name, image, subcat }, i) => (
            <div key={i} className="text-sm bg-white rounded-2xl shadow-sm p-2">
              <div className="relative px-5 py-2 font-semibold rounded-xl bg-gray-100 z-10">
                {name}
              </div>
              <div className="pl-5">
                <Link
                  href={generateHref(name, "All")}
                  className={`block relative px-5 py-2 lg:hover:text-[var(--theme)] last:pb-4 before:absolute before:h-16 first:before:h-10 before:w-4 before:border-l before:border-b before:border-gray-300 before:left-0 left-0 before:bottom-1/2 before:rounded-bl-md ${
                    !allsearchparams[name] && "text-[var(--theme)]"
                  }`}
                  scroll={false}
                  onClick={() => setopenfilter(false)}
                >
                  All
                </Link>
                {subcat.map((option, j) => (
                  <Link
                    key={j}
                    href={generateHref(name, option?.name)}
                    className={`block relative px-5 py-2 lg:hover:text-[var(--theme)] last:pb-4 before:absolute before:h-16 first:before:h-10 before:w-4 before:border-l before:border-b before:border-gray-300 before:left-0 left-0 before:bottom-1/2 before:rounded-bl-md cursor-pointer ${
                      allsearchparams[name] === option?.name &&
                      "text-[var(--theme)]"
                    }`}
                    scroll={false}
                    onClick={() => setopenfilter(false)}
                  >
                    {option?.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* close screen */}
      <button
        className="absolute top-0 left-0 h-full w-full z-0"
        onClick={() => setopenfilter(false)}
      ></button>
    </div>
  );
}

export default Sidemenu;
