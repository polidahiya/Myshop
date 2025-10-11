"use client";
import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";

function Backbutton() {
  return <BsArrowLeftShort onClick={() => history.back()} />;
}

export default Backbutton;
