import React from "react";
import Menubutton from "./_comps/Menubutton";
import { IoIosSearch } from "react-icons/io";
import Editbutton from "./Editbutton";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Link from "next/link";

function Navbar({ logo, storename, storeid }) {
  const shortName =
    storename.length > 20 ? storename.slice(0, 15) + "..." : storename;

  return (
    <nav className="sticky top-0 z-20 shadow-sm h-16 bg-white px-2 md:px-10 flex items-center">
      <Menubutton />
      <Link href={`/${storeid}`} className="flex items-center gap-3 ml-3">
        {logo && (
          <Nextimage
            className="h-10"
            src={logo}
            alt="Logo"
            height={40}
            width={40}
          />
        )}
        <span className="text-2xl font-semibold capitalize font-tenor">
          {shortName}
        </span>
      </Link>
      <div className="ml-auto  mr-2 flex items-center gap-2">
        <button className="w-10 aspect-square flex items-center justify-center text-3xl">
          <IoIosSearch />
        </button>
        <Editbutton />
      </div>
    </nav>
  );
}

export default Navbar;
