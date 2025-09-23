import React from "react";
import { getStoreData } from "./Storedata";
import { Authfn } from "@/lib/auth";
import Category1 from "./_comps/Category/Category1";
import Slider1 from "./_comps/Slider/Slider1";
import Slider2 from "./_comps/Slider/Slider2";
import Showcase1 from "./_comps/Showcase/Showcase1";
import About1 from "./_comps/About/About1";
import { testimage } from "@/lib/data";
import Compwrapper from "./_comps/Compwrapper";
import Addcompmenu from "./_comps/Addcompmenu/Addcompmenu";
import { Addnewbutton } from "./_comps/Compwrapper";
import Thememenucomp from "./_comps/Thememenucomp/Thememenucomp";
import DeviceDetector from "../_globalcomps/Devicedetector";

export const Compdata = {
  Navbar: [
    {
      type: 1,
      comp: Slider1,
      paid: false,
      img: testimage,
    },
  ],
  Slider: [
    {
      type: 1,
      comp: Slider1,
      paid: false,
      img: testimage,
    },
    {
      type: 2,
      comp: Slider2,
      paid: false,
      img: testimage,
    },
  ],
  Collections: [
    {
      type: 1,
      comp: Category1,
      paid: false,
      img: testimage,
    },
  ],
  About: [
    {
      type: 1,
      comp: About1,
      paid: false,
      img: testimage,
    },
  ],
  Showcase: [
    {
      type: 1,
      comp: Showcase1,
      paid: false,
      img: testimage,
    },
  ],
  Banner: [
    {
      type: 1,
      comp: Category1,
      paid: false,
      img: testimage,
    },
  ],
  Faq: [
    {
      type: 1,
      comp: Category1,
      paid: false,
      img: testimage,
    },
  ],
  Footer: [
    {
      type: 1,
      comp: Category1,
      paid: false,
      img: testimage,
    },
  ],
};

export default async function page({ params }) {
  const { storeid } = await params;
  const { isadmin } = await Authfn(storeid);

  const storedata = await getStoreData(storeid);
  const data = storedata?.home || [];
  const device = await DeviceDetector();

  return (
    <div className="space-y-5 md:space-y-10 py-2 md:py-5 mb-10">
      {data.length == 0 && isadmin && <Addnewbutton i={0} />}
      {data.map((comp, i) => {
        const selectedcomp = Compdata[comp.category]?.find(
          (item) => item?.type == comp?.type
        );
        const Render = selectedcomp?.comp;
        const content = (
          <Render storeid={storeid} device={device} {...comp?.props} />
        );
        return (
          <div key={i}>
            {isadmin ? (
              <Compwrapper storeid={storeid} i={i} comp={comp}>
                {content}
              </Compwrapper>
            ) : (
              content
            )}
          </div>
        );
      })}
      {isadmin && (
        <>
          <Addcompmenu Compdata={stripComp(Compdata)} storeid={storeid} />
          <Thememenucomp Compdata={stripComp(Compdata)} storeid={storeid} />
        </>
      )}
    </div>
  );
}

function stripComp(obj) {
  if (Array.isArray(obj)) {
    return obj.map(stripComp);
  } else if (typeof obj === "object" && obj !== null) {
    const { comp, ...rest } = obj; // remove comp
    return Object.fromEntries(
      Object.entries(rest).map(([key, value]) => [key, stripComp(value)])
    );
  }
  return obj;
}
