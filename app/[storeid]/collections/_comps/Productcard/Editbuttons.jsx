"use client";
import Link from "next/link";
import React from "react";
import { AppContextfn } from "@/app/Context";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

function Editbuttons({ storeid, product }) {
  const { setshowdialog } = AppContextfn();

  return (
    <div className="absolute top-2 left-2 flex flex-col gap-2">
      {/* Edit Button */}
      <Link
        href={`/${storeid}/product/add?edit=${product?._id}`}
        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
      >
        <FaRegEdit className="w-4 h-4 text-gray-700" />
      </Link>

      {/* Delete Button */}
      <button
        onClick={() => {
          setshowdialog({
            show: true,
            title: "Delete?",
            type: false,
            continue: async () => {
              // await deleteproduct(product._id);
            },
          });
        }}
        className="p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition"
      >
        <FaTrashAlt className="w-4 h-4 text-red-500" />
      </button>
    </div>
  );
}

export default Editbuttons;
