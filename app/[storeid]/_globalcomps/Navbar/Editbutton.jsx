"use client";
import React from "react";
import { Storehomectxfn } from "../../Storecontext";
import { MdModeEdit } from "react-icons/md";

function Editbutton() {
  const { setedit } = Storehomectxfn();
  return (
    <button
      onClick={() => setedit((pre) => !pre)}
      className="w-10 aspect-square flex items-center justify-center text-3xl"
    >
      <MdModeEdit />
    </button>
  );
}

export default Editbutton;
