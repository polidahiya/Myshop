"use client";
import React from "react";
import { LuFilter } from "react-icons/lu";
import { AppContextfn } from "@/app/Context";

function Heading() {
  const { setopenfilter } = AppContextfn();
  return (
    <div className="py-10 px-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Collection</h1>
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white rounded-md shadow-md cursor-pointer"
          onClick={() => setopenfilter((pre) => !pre)}
        >
          <LuFilter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>
      <p>Home / collections</p>
    </div>
  );
}

export default Heading;
