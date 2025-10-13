"use client";
import React from "react";
import { Storehomectxfn } from "../../Storecontext";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Link from "next/link";

export default function Addcompmenu({ Compdata, storeid }) {
  const { addmenu, setaddmenu } = Storehomectxfn();

  return (
    <>
      {addmenu.show && (
        <div className="fixed top-0 left-0 h-dvh w-full flex items-center justify-center bg-black/20 z-40 p-2">
          <div className="w-full max-w-3xl bg-white flex flex-col rounded-3xl">
            {/* header */}
            <div className="flex p-2 items-center">
              <div className="flex-1 font-tenor text-2xl pl-5">
                Add a Component
              </div>
              <button
                className="w-10 aspect-square rounded-full bg-gray-200"
                onClick={() => setaddmenu((pre) => ({ ...pre, show: false }))}
              >
                X
              </button>
            </div>
            {/* body */}
            <div className="flex flex-col gap-5 p-5 max-h-96 overflow-y-auto mb-5">
              {Object.entries(Compdata).map(([key, value]) => (
                <div key={key}>
                  <div className="text-xl font-bold">{key}</div>
                  <div className="flex overflow-x-scroll gap-4 ">
                    {value.map((item, j) => (
                      <Link prefetch={false}
                        key={j}
                        href={`/${storeid}/Edithome?add=true&at=${addmenu?.addat}&category=${key}&type=${item?.type}`}
                        className="w-44 aspect-square rounded cursor-pointer overflow-hidden shrink-0"
                      >
                        <Nextimage
                          src={item.img}
                          alt={`${item?.type} image`}
                          width={500}
                          height={500}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
