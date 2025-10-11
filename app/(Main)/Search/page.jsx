import React from "react";
import Clientpage from "./Clientpage";
import DeviceDetector from "../../_globalcomps/Devicedetector";
import dynamic from "next/dynamic";
const Googleads = dynamic(() => import("../../_globalcomps/ads/Googleads"));

async function page() {
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
