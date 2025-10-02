"use client";
import React, { useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Productcard from "../collections/_comps/Productcard/Productcard";

export default function Productsslide({ heading, data }) {
  const containerref = useRef(null);

  return (
    <div className="py-14">
      <div className="flex justify-between md:items-center px-8">
        <h2 className="text-2xl md:text-4xl font-tenor">{heading}</h2>
        <div className="flex items-center gap-10 md:ml-auto">
          <button
            className="lg:hover:-translate-x-1 duration-300 ml-auto md:ml-0"
            onClick={() => {
              containerref.current.scrollBy({ left: -300, behavior: "smooth" });
            }}
          >
            <IoIosArrowBack className="text-[var(--usertheme)] text-3xl" />
          </button>
          <button
            className="lg:hover:translate-x-1 duration-300"
            onClick={() => {
              containerref.current.scrollBy({ left: 300, behavior: "smooth" });
            }}
          >
            <IoIosArrowBack className="text-[var(--usertheme)] text-3xl rotate-180" />
          </button>
        </div>
      </div>
      <div className="px-5">
        <div
          className="overflow-x-scroll snap-x scroll-smooth snap-mandatory flex gap-[10px] mt-[30px] hidescroll"
          ref={containerref}
        >
          {data.map((item, i) => (
            <div
              key={i}
              className="min-w-full md:min-w-72 md:max-w-72 snap-start grow-0"
            >
              <Productcard product={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
