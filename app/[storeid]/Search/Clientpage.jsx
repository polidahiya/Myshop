"use client";
import React, { useState } from "react";
import Searchbar from "@/app/_globalcomps/Searchbar/Searchbar";
import { Searchproducts } from "./Serveraction";
import { AppContextfn } from "@/app/Context";
import Productcard from "../collections/_comps/Productcard/Productcard";
import Ads from "../collections/_comps/Ads";
import dynamic from "next/dynamic";
const Nextimage = dynamic(() => import("@/app/_globalcomps/Nextimage"));
import { FaAngleLeft } from "react-icons/fa6";

export default function Clientpage({ storeid, isadmin }) {
  const { setmessagefn } = AppContextfn();
  const [query, setQuery] = useState("");
  const [searchres, setsearchres] = useState([]);

  return (
    <div className="px-2 md:px-10">
      <div className="flex justify-center gap-1 mt-5">
        <button
          className="w-12 aspect-square rounded-xl border border-slate-200 bg-white flex items-center justify-center shadow-sm"
          onClick={() => window.history.back()}
        >
          <FaAngleLeft />
        </button>
        <Searchbar
          Api={async (query) => {
            const res = await Searchproducts(query, storeid);
            if (res.status == 200) {
              setsearchres(res.data);
            } else {
              setmessagefn(res.message);
            }
          }}
          getQuery={(res) => {
            setQuery(res);
          }}
        />
      </div>
      {searchres.length == 0 && query.length != 0 ? (
        <div className="flex justify-center mt-5">
          <Nextimage
            src="/productnotfound.png"
            alt="noresult"
            width={500}
            height={500}
            quality={100}
          />
        </div>
      ) : (
        <>
          <div className="h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10 mt-5">
            {searchres.map((product, i) => (
              <React.Fragment key={i}>
                <Productcard
                  storeid={storeid}
                  product={product}
                  isadmin={isadmin}
                />
                <Ads i={i} />
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
