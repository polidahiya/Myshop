import React from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link prefetch={false} href="/A2Z" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-md flex items-center justify-center text-white font-bold">
            A2Z
          </div>
          <div>
            <h1 className="text-lg font-semibold">A2Z</h1>
            <p className="text-xs text-gray-500">
              Create your online store — fast
            </p>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-1 lg:gap-2">
          <Link prefetch={false}
            href={"/Search"}
            className="w-10 aspect-square flex items-center justify-center border border-gray-300 rounded-md"
          >
            <FiSearch />
          </Link>
          <Link prefetch={false}
            href="/account/signup"
            className="h-10 px-4 flex items-center justify-center rounded-md bg-theme text-white shadow text-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
