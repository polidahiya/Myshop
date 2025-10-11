import React from "react";
import Navbar from "./_globalcomps/Navbar/Navbar";
import { getStoreData } from "./Storedata";
import FIxedbuttons from "./_globalcomps/Fixedbuttons";
import Sidemenu from "./_globalcomps/Sidemenu/Sidemenu";
import { Authfn } from "@/lib/auth";
import { Storehomectxwrapper } from "./Storecontext";
import { notFound } from "next/navigation";
import { Getuserdata } from "@/app/_globalcomps/Getuserdata";

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
  if (!storedata) notFound();
  const storedatawithoutcollections = { ...storedata };
  delete storedatawithoutcollections.collections;

  let issavedstore = false;

  if (auth?.verified) {
    const userdata = await Getuserdata();
    issavedstore = userdata?.savedstores?.includes(storeid);
  }
  return (
    <Storehomectxwrapper>
      <div
        style={{
          "--usertheme": storedata?.color?.theme,
          "--secondary": storedata?.color?.secondary,
          "--text": storedata?.color?.text,
        }}
        className={`text-[var(--text)]`}
      >
        <Navbar
          auth={auth}
          logo={storedata?.logo}
          storename={storedata?.storename}
          storeid={storeid}
        />

        <Sidemenu auth={auth} storeid={storeid} issavedstore={issavedstore} />
        {children}
        <FIxedbuttons
          whatsapp={storedata?.contact?.whatsapp}
          storename={storedata?.storename}
        />
      </div>
    </Storehomectxwrapper>
  );
}

export default layout;
