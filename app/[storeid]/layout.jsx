import React from "react";
import Navbar from "./_globalcomps/Navbar/Navbar";
import { getStoreData } from "./Storedata";
import FIxedbuttons from "./_globalcomps/Fixedbuttons";
import Sidemenu from "./_globalcomps/Sidemenu/Sidemenu";
import { Authfn } from "@/lib/auth";
import { Storehomectxwrapper } from "./Storecontext";
import { notFound } from "next/navigation";
import { Getuserdata } from "@/app/_globalcomps/Getuserdata";

async function layout({ children, params }) {
  const { storeid } = await params;
  const auth = await Authfn(storeid);

  const storedata = await getStoreData(storeid);
  if (!storedata) notFound();
  const storedatawithoutcollections = { ...storedata };
  delete storedatawithoutcollections.collections;

  let issavedstore = false;
  let userdata = null;

  if (auth?.verified) {
    userdata = await Getuserdata();
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
          logo={storedata?.logo}
          storename={storedata?.storename}
          storeid={storeid}
          isadmin={auth?.isadmin}
        />

        <Sidemenu
          verified={auth?.verified}
          storeid={storeid}
          userstoreid={auth?.storeid}
          useremail={auth?.email}
          username={userdata?.name}
          issavedstore={issavedstore}
        />
        {children}
        <FIxedbuttons
          whatsapp={storedata?.contact?.whatsapp}
          storename={storedata?.storename}
        />
      </div>
    </Storehomectxwrapper>
  );
}
export const generateMetadata = async ({ params }) => {
  const { storeid } = await params;
  const storedata = await getStoreData(storeid);
  const image = storedata?.logo || "";

  return {
    icons: {
      icon: image || "/favicon.ico",
    },
    manifest: `/api/manifest?storeid=${storeid}`,
  };
};

export default layout;
