"use client";
import React from "react";
import { Storehomectxfn } from "../../Storecontext";
import { MdOutlineEdit } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Editbutton({ storeid }) {
  const path = usePathname();
  const { setedit } = Storehomectxfn();
  const homelink = `/${storeid}`;
  return (
    <Link prefetch={false}
      href={homelink}
      onClick={(e) => {
        if (path == homelink) {
          e.preventDefault();
        }
        setedit((pre) => !pre);
      }}
      className="w-10 aspect-square flex items-center justify-center text-3xl"
    >
      <MdOutlineEdit />
    </Link>
  );
}

export default Editbutton;
