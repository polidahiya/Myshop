"use client";
import React, { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [menu, setmenu] = useState(false);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link href="/A2Z" className="flex items-center gap-3">
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

        <nav
          className={`fixed md:static top-0 left-0 w-full md:w-auto h-screen md:h-auto bg-white flex flex-col md:flex-row md:items-center py-20 md:py-0 gap-2 md:gap-6 text-sm px-2 ${
            menu ? "-translate-x-0" : "-translate-x-full md:translate-x-0"
          } duration-300`}
        >
          <button
            className="absolute top-4 right-4 text-2xl md:hidden"
            onClick={() => setmenu(!menu)}
          >
            X
          </button>
          <Link
            href="#features"
            className="hover:text-theme text-center border border-gray-200 rounded-md py-3 shadow-sm md:shadow-none md:border-0"
          >
            Features
          </Link>
          <Link
            href="#templates"
            className="hover:text-theme text-center border border-gray-200 rounded-md py-3 shadow-sm md:shadow-none md:border-0"
          >
            Templates
          </Link>
          <Link
            href="#pricing"
            className="hover:text-theme text-center border border-gray-200 rounded-md py-3 shadow-sm md:shadow-none md:border-0"
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className="hover:text-theme text-center border border-gray-200 rounded-md py-3 shadow-sm md:shadow-none md:border-0"
          >
            Contact
          </Link>
          <Link
            href="/account/login"
            className="px-4 py-3 md:py-2 rounded-md border border-theme text-theme hover:bg-indigo-50 text-center mt-auto md:mt-0"
          >
            Login
          </Link>
          <Link
            href="/account/signup"
            className="px-4 py-3 md:py-2 rounded-md bg-theme text-white shadow text-center"
          >
            Get Started
          </Link>
        </nav>

        <div className="md:hidden">
          <button
            className="px-3 py-2 rounded-md border"
            onClick={() => setmenu(!menu)}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
