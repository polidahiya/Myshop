"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AppContextfn } from "@/app/Context";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const filter = {
  Gender: {
    Mens: {},
    Womens: {},
    Kids: {},
  },
  Sizes: {
    "size 1 (35)": {},
    "size 2 (36)": {},
    "size 3 (37)": {},
    "size 4 (38)": {},
    "size 5 (39)": {},
    "size 6 (40)": {},
    "size 7 (41)": {},
    "size 8 (42)": {},
    "size 9 (43)": {},
    "size 10 (44)": {},
    "size 11 (45)": {},
    "size 12 (46)": {},
  },
  Types: {
    Sneakers: {},
    "Running Shoes": {},
    "Casual Shoes": {},
    "Formal Shoes": {},
    Loafers: {},
    Boots: {},
    Sandals: {},
    Slippers: {},
    "Flip-Flops": {},
    Heels: {},
    "Sports Shoes": {},
    "Ethnic Footwear": {},
  },
};

function Sidemenu({ allsearchparams }) {
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
    <AnimatePresence>
      {openfilter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 shrink-0 lg:static w-full lg:w-auto h-dvh lg:h-auto bg-black/10 lg:bg-transparent z-40 lg:z-0 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className={`relative h-full w-72 min-w-72 max-w-72 z-10 bg-white lg:bg-transparent flex flex-col`}
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
              {Object.entries(filter).map(([category, value], i) => (
                <div
                  key={i}
                  className="text-sm bg-white rounded-2xl shadow-md p-2"
                >
                  <div className="relative px-5 py-2 font-semibold rounded-xl bg-gray-100 z-10">
                    {category}
                  </div>
                  <div className="pl-5">
                    <Link
                      href={generateHref(category, "All")}
                      className={`block relative px-5 py-2 lg:hover:text-[var(--theme)] last:pb-4 before:absolute before:h-16 first:before:h-10 before:w-4 before:border-l before:border-b before:border-gray-300 before:left-0 left-0 before:bottom-1/2 before:rounded-bl-md ${
                        !allsearchparams[category] && "text-[var(--theme)]"
                      }`}
                      scroll={false}
                      onClick={() => setopenfilter(false)}
                    >
                      All
                    </Link>
                    {Object.keys(value).map((itemj, j) => (
                      <Link
                        key={j}
                        href={generateHref(category, itemj)}
                        className={`block relative px-5 py-2 lg:hover:text-[var(--theme)] last:pb-4 before:absolute before:h-16 first:before:h-10 before:w-4 before:border-l before:border-b before:border-gray-300 before:left-0 left-0 before:bottom-1/2 before:rounded-bl-md cursor-pointer ${
                          allsearchparams[category] === itemj &&
                          "text-[var(--theme)]"
                        }`}
                        scroll={false}
                        onClick={() => setopenfilter(false)}
                      >
                        {itemj}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          {/* close screen */}
          <button
            className="absolute top-0 left-0 h-full w-full z-0"
            onClick={() => setopenfilter(false)}
          ></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidemenu;
