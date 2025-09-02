"use client";
import React from "react";
import { AppContextfn } from "@/app/Context";
import { LuMenu } from "react-icons/lu";

function Menubutton() {
  const { setshowsidemenu } = AppContextfn();
  return (
    <button
      className="w-10 aspect-square flex items-center justify-center text-3xl"
      onClick={() => setshowsidemenu((pre) => !pre)}
    >
      <LuMenu />
    </button>
  );
}

export default Menubutton;
