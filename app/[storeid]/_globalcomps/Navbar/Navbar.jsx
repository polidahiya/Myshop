import React from "react";
import Menubutton from "./_comps/Menubutton";
import { IoIosSearch } from "react-icons/io";
import Editbutton from "./Editbutton";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Link from "next/link";

function Navbar({ isadmin, logo, storename, storeid }) {
  const shortName =
    storename.length > 20 ? storename.slice(0, 15) + "..." : storename;

  return (
    <nav className="sticky top-0 z-20 shadow-sm h-16 bg-white px-2 md:px-10 flex items-center">
      <Menubutton />
      <Link prefetch={false} href={`/${storeid}`} className="flex items-center gap-3 ml-3">
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
        <Link prefetch={false}
          href={`/${storeid}/Search`}
          className="w-10 md:w-auto md:h-10 aspect-square md:aspect-auto flex items-center justify-center md:bg-gray-100 md:rounded-full md:cursor-text"
        >
          <span className="hidden md:inline-block pr-40 pl-6">Search...</span>
          <IoIosSearch className="text-3xl md:text-2xl w-auto md:w-10 aspect-auto md:aspect-square md:mr-1" />
        </Link>
        {isadmin && <Editbutton storeid={storeid} />}
      </div>
    </nav>
  );
}

export default Navbar;
