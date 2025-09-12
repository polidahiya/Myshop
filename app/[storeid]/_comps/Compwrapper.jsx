"use client";
import Link from "next/link";
import React from "react";
import { Storehomectxfn } from "../Storecontext";

export default function Compwrapper({ children, storeid, i }) {
  const { edit } = Storehomectxfn();
  return (
    <div className="relative">
      {edit && (
        <div className="absolute top-2 right-2 flex gap-2 p-1 bg-white rounded-full shadow-sm z-10">
          <Link
            href={`/${storeid}/Edithome?edit=${i}`}
            className="flex items-center justify-center w-10 aspect-square z-10 rounded-full"
          >
            e
          </Link>
          <button className="flex items-center justify-center w-10 aspect-square z-10 rounded-full">
            d
          </button>
        </div>
      )}
      {children}
      {edit && (
        <div className="p-5">
          <Addnewbutton storeid={storeid} i={i} />
        </div>
      )}
    </div>
  );
}

const Addnewbutton = ({ storeid, i }) => {
  return (
    <Link
      href={`/${storeid}/Edithome?add=${i}`}
      className="flex items-center justify-center h-20 w-full rounded-xl border-2 border-dashed border-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 text-3xl font-bold text-gray-500"
    >
      +
    </Link>
  );
};
