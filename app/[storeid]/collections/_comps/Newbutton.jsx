import React from "react";
import Link from "next/link";
import { TbNewSection } from "react-icons/tb";

function Newbutton({ storeid }) {
  return (
    <Link
      href={`/${storeid}/product/add`}
      className="w-full aspect-square flex flex-col items-center justify-center"
    >
      <div className="w-1/2 aspect-square bg-gray-100 flex items-center justify-center rounded-3xl shadow-md">
        <TbNewSection className="text-5xl" />
      </div>
      <p className="text-center text-2xl mt-2">Add New</p>
    </Link>
  );
}

export default Newbutton;
