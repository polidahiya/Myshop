import React from "react";
import Navbar from "./_globalcomps/Navbar/Navbar";
import { getStoreData } from "./Storedata";
import FIxedbuttons from "./_globalcomps/Fixedbuttons";
import Sidemenu from "./_globalcomps/Sidemenu/Sidemenu";
import { Authfn } from "@/lib/auth";
import { Storehomectxwrapper } from "./Storecontext";
import Verification from "@/lib/verification";

export const metadata = {
  title: "",
  description: "",
  keywords: "",
  //   openGraph: {
  //     images: `/logo&ui/minlogo.png`,
  //   },
  // manifest: "/manifest.json",
  robots: "index, follow",
};

async function layout({ children, params }) {
  const { storeid } = await params;
  const auth = await Authfn(storeid);
  const storedata = await getStoreData(storeid);
  const storedatawithoutcollections = { ...storedata };
  delete storedatawithoutcollections.collections;

  const personaldata = await Verification("public");

  return (
    <Storehomectxwrapper>
      <div
        style={{
          "--theme": storedata?.color?.theme,
          "--secondary": storedata?.color?.secondary,
          "--text": storedata?.color?.text,
        }}
        className={`text-[var(--text)]`}
      >
        <Navbar
          logo={storedata?.logo}
          storename={storedata?.storename}
          storeid={storeid}
        />
        <Sidemenu
          auth={auth}
          storedata={storedatawithoutcollections}
          storeid={storeid}
          personaldata={personaldata}
        />
        {children}
        <FIxedbuttons whatsapp={storedata?.contact?.whatsapp} />
      </div>
    </Storehomectxwrapper>
  );
}

export default layout;
