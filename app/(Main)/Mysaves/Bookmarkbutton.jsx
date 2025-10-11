"use client";
import React from "react";
import { IoBookmark } from "react-icons/io5";
import { Saveitems } from "@/app/_globalcomps/Saveitems";
import Revalidatepathfn from "@/app/_globalcomps/Revalidatepathfn";

function Bookmarkbutton({ istoretype, id }) {
  return (
    <button
      className={`absolute w-10 aspect-square flex items-center justify-center ${
        istoretype ? "top-1/2 right-2 -translate-y-1/2" : " right-2 top-2"
      }`}
      onClick={async () => {
        const res = await Saveitems(istoretype ? "Store" : "Product", id);
        if (res.status == 200) {
          Revalidatepathfn("/Mysaves");
        }
      }}
    >
      <IoBookmark size={18} />
    </button>
  );
}

export default Bookmarkbutton;
