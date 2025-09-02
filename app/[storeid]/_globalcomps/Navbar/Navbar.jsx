import React from "react";
import Menubutton from "./_comps/Menubutton";
import { IoIosSearch } from "react-icons/io";

function Navbar({ logo, storename }) {
  return (
    <nav className="sticky top-0 z-20 shadow-md h-16 bg-white px-2 md:px-10 flex items-center">
      <Menubutton />
      {logo ? (
        <img
          className="h-10 ml-3"
          src="https://rentbean.in/_next/image?url=%2Flogo%26ui%2F3dlogo.png&w=640&q=75"
          alt=""
        />
      ) : (
        <span className="text-2xl font-semibold capitalize font-tenor ml-3">
          {storename}
        </span>
      )}
      <button className="w-10 aspect-square flex items-center justify-center text-3xl ml-auto mr-2">
        <IoIosSearch />
      </button>
    </nav>
  );
}

export default Navbar;
