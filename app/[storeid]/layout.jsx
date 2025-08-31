import React from "react";
import Navbar from "./_globalcomps/Navbar/Navbar";
import { getStoreData } from "./Storedata";
import { Mulish } from "next/font/google";
import FIxedbuttons from "./_globalcomps/Fixedbuttons";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"], // choose weights you need
  style: ["normal", "italic"], // optional
  display: "swap",
});

export const metadata = {
  title: "",
  description: "",
  keywords: "",
  //   openGraph: {
  //     images: `/logo&ui/minlogo.png`,
  //   },
  manifest: "/manifest.json",
  robots: "index, follow",
};

async function layout({ children, params }) {
  const { storeid } = await params;
  const storedata = await getStoreData(storeid);

  return (
    <>
      <div
        style={{
          "--theme-color": storedata?.color?.theme,
          "--secondary-color": storedata?.color?.secondary,
          "--text-color": storedata?.color?.text,
        }}
        className={`${mulish.className} text-[var(--text-color)] antialiased max-w-[1900px] mx-auto`}
      >
        <Navbar logo={storedata?.logo} />
        {children}
        <FIxedbuttons />
      </div>
    </>
  );
}

export default layout;
