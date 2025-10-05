import React from "react";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Linkgenerator from "../Slider/Linkgenerator";
import Link from "next/link";

const imagewidths = {
  mobile: { width: 500 },
  tablet: { width: 1000 },
  desktop: { width: 1920 },
};

function Banner1({ storeid, device, items }) {
  const slide = items[0];
  const [aspectwidth, aspectheight] = slide?.aspectratio.split("/");
  const imagewidth = imagewidths[device]?.width;
  return (
    <div className="">
      <Link href={Linkgenerator(slide, storeid)}>
        <Nextimage
          src={slide?.img}
          alt={slide?.title}
          width={imagewidth}
          height={Math.round(imagewidth * (aspectheight / aspectwidth))}
          className={`h-auto w-full ${
            slide?.cover ? "object-cover" : "object-contain"
          }`}
          style={{
            aspectRatio: slide?.aspectratio, // ensures correct scaling
          }}
        />
      </Link>
    </div>
  );
}

export default Banner1;
