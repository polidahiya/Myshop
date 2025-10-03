"use client";
import React from "react";
import { Productctxfn } from "../Productcontext";
import Nextimage from "@/app/_globalcomps/Nextimage";

function Options({ options }) {
  const { setSelectedImageIndex, selectedoptions, setselectedoptions } =
    Productctxfn();

  return options?.length > 0 ? (
    <div className="mt-5 space-y-5 pt-5 border-t border-gray-200">
      {options.map((opt, i) => (
        <div key={i}>
          <p>{opt?.name} : </p>
          <div className="flex gap-2 mt-1.5 overflow-x-scroll hidescroll">
            {opt?.options.map((option, j) => (
              <button
                key={j}
                className={`flex items-center gap-2 flex-shrink-0 rounded-full  border border-gray-200 whitespace-nowrap cursor-pointer ${
                  option?.image ? "py-2 pl-[10px] pr-6" : "py-4 px-10"
                } ${(selectedoptions[i] || 0) == j && "bg-gray-100"}`}
                onClick={() => {
                  setSelectedImageIndex(option?.imageindex);
                  setselectedoptions((pre) => {
                    const updated = [...pre];
                    updated[i] = j;
                    return updated;
                  });
                }}
              >
                {option?.image && (
                  <Nextimage
                    src={option?.image}
                    alt={option?.name}
                    height={40}
                    width={40}
                    className="w-10 aspect-square rounded-full"
                  />
                )}
                {option?.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : null;
}

export default Options;
