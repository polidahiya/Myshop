import React from "react";
import Clientpage from "./Clientpage";
import DeviceDetector from "../../_globalcomps/Devicedetector";
import dynamic from "next/dynamic";
import Link from "next/link";
import { IoBookmark } from "react-icons/io5";
const Googleads = dynamic(() => import("../../_globalcomps/ads/Googleads"));
import { Authfn } from "@/lib/auth";

async function page() {
  const auth = await Authfn();
  const islogedin = auth?.verified;
  const device = await DeviceDetector();

  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="relative flex gap-2 px-2 md:px-10">
        {device != "mobile" && (
          <div className="flex-1 h-fit sticky top-20 min-h-screen max-w-96 hidden md:block w-full">
            <Googleads type={3} />
          </div>
        )}
        <div className="flex-1">
          <Clientpage />
          {islogedin && (
            <Link
              prefetch={false}
              href="/Mysaves?type=savedstores"
              className="sticky bottom-5 w-full  max-w-2xl mx-auto h-12 rounded-md bg-theme text-white px-3 flex items-center justify-center gap-3"
            >
              <IoBookmark /> Saved Stores
            </Link>
          )}
        </div>
        {device != "mobile" && (
          <div className="flex-1 h-fit sticky top-20 min-h-screen max-w-96 hidden md:block w-full">
            <Googleads type={3} />
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
