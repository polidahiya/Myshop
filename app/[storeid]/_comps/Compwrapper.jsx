"use client";
import Link from "next/link";
import React from "react";
import { Storehomectxfn } from "../Storecontext";
import { IoIosColorPalette } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AppContextfn } from "@/app/Context";
import { Deletehomecomp } from "../Edithome/Serveraction";
import Revalidatepathfn from "@/app/_globalcomps/Revalidatepathfn";

export default function Compwrapper({ children, storeid, i, comp }) {
  const { setshowdialog, setmessagefn } = AppContextfn();
  const { edit, setthememenu } = Storehomectxfn();
  return (
    <>
      {i == 0 && edit && (
        <div className="p-5">
          <Addnewbutton i={i} />
        </div>
      )}
      <div className="relative">
        {edit && (
          <div className="absolute top-2 right-2 flex gap-2 p-1 bg-slate-100 rounded-full shadow-sm z-10">
            <Link
              href={`/${storeid}/Edithome?add=false&at=${i}`}
              className="flex items-center justify-center bg-white text-blue-500 w-10 aspect-square z-10 rounded-full"
            >
              <MdModeEditOutline />
            </Link>
            <button
              className="flex items-center justify-center bg-white text-green-500 w-10 aspect-square z-10 rounded-full"
              onClick={() => {
                setthememenu(() => ({ show: true, data: comp, at: i }));
              }}
            >
              <IoIosColorPalette />
            </button>
            <button
              className="flex items-center justify-center bg-white text-red-500 w-10 aspect-square z-10 rounded-full"
              onClick={() =>
                setshowdialog({
                  show: true,
                  title: "Delete?",
                  type: false,
                  continue: async () => {
                    const res = await Deletehomecomp(i);
                    setmessagefn(res?.message);
                    if (res?.status == 200) Revalidatepathfn(`/${storeid}`);
                  },
                })
              }
            >
              <MdDelete />
            </button>
          </div>
        )}
        {children}
        {edit && (
          <div className="p-5">
            <Addnewbutton i={i + 1} />
          </div>
        )}
      </div>
    </>
  );
}

export function Addnewbutton({ i }) {
  const { setaddmenu } = Storehomectxfn();
  return (
    <button
      className="flex items-center justify-center h-20 w-full rounded-xl border-2 border-dashed border-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 text-3xl font-bold text-gray-500"
      onClick={() => {
        setaddmenu((pre) => ({ ...pre, show: true, addat: i }));
      }}
    >
      +
    </button>
  );
}
