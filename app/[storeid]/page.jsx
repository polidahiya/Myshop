import React from "react";
import { getStoreData } from "./Storedata";
import { Authfn } from "@/lib/auth";
import { Addnewbutton } from "./_comps/Compwrapper";
import DeviceDetector from "../_globalcomps/Devicedetector";
import { Compdatawithoutcompsfn } from "./_comps/Homedata/Compdata";
import { Compdata } from "./_comps/Homedata/Compdata";
import dynamic from "next/dynamic";
import Footer from "./_comps/Footer/Footer";

const Compwrapper = dynamic(() => import("./_comps/Compwrapper"));
const Thememenucomp = dynamic(() =>
  import("./_comps/Thememenucomp/Thememenucomp")
);
const Addcompmenu = dynamic(() => import("./_comps/Addcompmenu/Addcompmenu"));

const Compmap = {
  Slider: dynamic(() => import("./_comps/Slider/Slider")),
  About: dynamic(() => import("./_comps/About/About")),
  Collections: dynamic(() => import("./_comps/Collections/Collections")),
  Banner: dynamic(() => import("./_comps/Banner/Banner")),
  Faq: dynamic(() => import("./_comps/Faq/Faq")),
  Showcase: dynamic(() => import("./_comps/Showcase/Showcase")),
};

export default async function page({ params }) {
  const { storeid } = await params;
  const { isadmin } = await Authfn(storeid);

  const storedata = await getStoreData(storeid);
  const data = storedata?.home || [];
  const device = await DeviceDetector();
  const Compdatawithoutcomps = Compdatawithoutcompsfn();

  return (
    <div className="space-y-5 md:space-y-10">
      {data.length == 0 && isadmin && <Addnewbutton i={0} />}
      {data.map((comp, i) => {
        const definition = Compdata[comp?.category].find(
          (item) => item?.type == comp?.type
        );

        const Component = definition?.comp;
        //
        const Wrapper = Compmap[comp.category];
        const element = (
          <Wrapper
            storeid={storeid}
            device={device}
            Component={Component}
            compProps={comp?.props}
          />
        );

        return (
          <div key={i}>
            {isadmin ? (
              <Compwrapper storeid={storeid} i={i} comp={comp}>
                {element}
              </Compwrapper>
            ) : (
              element
            )}
          </div>
        );
      })}
      {/* footer */}
      {Object.keys(storedata?.social || {}).length > 0 && (
        <Footer social={storedata?.social} />
      )}
      {isadmin && (
        <>
          <Addcompmenu Compdata={Compdatawithoutcomps} storeid={storeid} />
          <Thememenucomp Compdata={Compdatawithoutcomps} storeid={storeid} />
        </>
      )}
    </div>
  );
}
