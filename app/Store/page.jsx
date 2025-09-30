import React from "react";
import Createstore from "./Createstore";
import Verification from "@/lib/verification";
import { redirect } from "next/navigation";
import Nextimage from "../_globalcomps/Nextimage";
import DeviceDetector from "../_globalcomps/Devicedetector";
const backgroundSizes = {
  mobile: {
    width: 320, // in pixels
    height: 600,
  },
  tablet: {
    width: 1024,
    height: 1200,
  },
  desktop: {
    width: 1920,
    height: 1440,
  },
};

async function page() {
  const tokenres = await Verification("public");
  const device = await DeviceDetector();

  if (!tokenres?.verified) {
    redirect(`/account/login?redirect=/Store`);
  } else if (tokenres?.storeid) {
    redirect(`/${tokenres?.storeid}`);
  }

  return (
    <div>
      <Nextimage
        src="/loginbackgroundimage.png"
        alt="blurry"
        width={backgroundSizes[device].width}
        height={backgroundSizes[device].height}
        className="absolute inset-0 object-cover w-full h-full brightness-50"
      />
      <Createstore />
    </div>
  );
}

export default page;
