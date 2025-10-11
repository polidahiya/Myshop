"use client";
import React, { useState } from "react";
import Searchbar from "@/app/_globalcomps/Searchbar/Searchbar";
import { Searchproducts } from "./Serveraction";
import { AppContextfn } from "@/app/Context";
import Ads from "../../[storeid]/collections/_comps/Ads";
import dynamic from "next/dynamic";
const Nextimage = dynamic(() => import("@/app/_globalcomps/Nextimage"));
import { testimage } from "@/lib/data";
import Link from "next/link";
import { RiQrScan2Line } from "react-icons/ri";

export default function Clientpage({}) {
  const { setmessagefn, setscanqr } = AppContextfn();
  const [query, setQuery] = useState("");
  const [searchres, setsearchres] = useState([]);

  return (
    <>
      <div className="sticky top-20 flex justify-center gap-1 mt-5">
        <Searchbar
          Api={async (query) => {
            const res = await Searchproducts(query);
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
        <button
          className="w-12 aspect-square rounded-xl border border-slate-200 bg-white flex items-center justify-center shadow-sm"
          onClick={() => {
            setscanqr(true);
          }}
        >
          <RiQrScan2Line />
        </button>
      </div>
      {searchres.length == 0 && query.length != 0 ? (
        <div className="flex justify-center mt-5">
          <Nextimage
            src="/productnotfound.png"
            alt="noresult"
            width={500}
            height={500}
            quality={100}
            loading="eager"
          />
        </div>
      ) : (
        <>
          <div className="mt-5 space-y-5 w-full max-w-2xl mx-auto">
            {searchres.map((store, i) => (
              <React.Fragment key={i}>
                <Link
                  href={`/${store?._id}`}
                  className="flex items-center gap-2 h-10"
                >
                  <Nextimage
                    src={store?.logo || testimage}
                    alt="Logo"
                    height={40}
                    width={40}
                    className=" aspect-square object-cover rounded-full"
                    loading="lazy"
                  />
                  <p className="text-center line-clamp-1">{store?.storename}</p>
                </Link>
                <Ads i={i} />
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </>
  );
}
