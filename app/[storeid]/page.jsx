import React from "react";
import { getStoreData } from "./Storedata";
import { Authfn } from "@/lib/auth";
import { Addnewbutton } from "./_comps/Compwrapper";
import DeviceDetector from "../_globalcomps/Devicedetector";
import { Compdatawithoutcompsfn } from "./_comps/Homedata/Compdata";
import { Compdata } from "./_comps/Homedata/Compdata";
import dynamic from "next/dynamic";
import Footer from "./_comps/Footer/Footer";
import Googleads from "../_globalcomps/ads/Googleads";

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
    <div className="w-full overflow-hidden">
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
          <React.Fragment key={i}>
            {isadmin ? (
              <Compwrapper storeid={storeid} i={i} comp={comp}>
                {element}
              </Compwrapper>
            ) : (
              element
            )}
            {(i + 1) % 5 == 0 && (
              <div className="w-full">
                <Googleads type={2} />
              </div>
            )}
          </React.Fragment>
        );
      })}
      {/* footer */}
      {Object.keys(storedata?.social || {}).length > 0 && (
        <Footer social={storedata?.social} />
      )}
      <div className="w-full">
        <Googleads type={2} />
      </div>
      {isadmin && (
        <>
          <Addcompmenu Compdata={Compdatawithoutcomps} storeid={storeid} />
          <Thememenucomp Compdata={Compdatawithoutcomps} storeid={storeid} />
        </>
      )}
    </div>
  );
}

export const generateMetadata = async ({ params }) => {
  const { storeid } = await params;
  const storedata = await getStoreData(storeid);
  const title = storedata?.storename || "A2Z Stores - Explore Amazing Products";
  const description = "Hey there! Checkout my Amazing collections";
  const keywords = "";
  const image = storedata?.logo || ""; // Default image if no variant image is found
  const url = `https://a2z-zeta.vercel.app/${storeid}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      url, // URL of the page
      site_name: title,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    additionalMetaTags: [
      { property: "og:type", content: "product" }, // Facebook Open Graph type
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
  };
};
