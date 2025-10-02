"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function Faq1({ items }) {
  const [open, setopen] = useState(0);

  return (
    <div>
      <div className="px-5">
        <h2 className="font-tenor text-2xl md:text-4xl text-center">
          Frequently asked Questions
        </h2>
        <div className="mt-5">
          {items.map((item, i) => (
            <Faq key={i} faq={item} i={i} open={open} setopen={setopen} />
          ))}
        </div>
      </div>
    </div>
  );
}
const Faq = ({ faq, i, open, setopen }) => {
  return (
    <div
      className={`pt-5 cursor-pointer border-b first:border-t border-[var(--usertheme)] `}
      onClick={() => {
        setopen(i);
      }}
    >
      <p className="flex items-start">
        <span className="font-tenor text-base md:text-2xl">
          {faq?.question}
        </span>
        <MdKeyboardArrowDown
          className={`min-w-10 ml-auto duration-300 text-2xl ${
            open == i && "rotate-180"
          }`}
        />
      </p>
      <div
        className={`font-tenor mt-5 ${
          open == i ? "max-h-screen duration-1000" : "max-h-0"
        }  overflow-hidden`}
      >
        <p className="pb-2 text-sm last:pb-4">{faq?.answer}</p>
      </div>
    </div>
  );
};

export default Faq1;
