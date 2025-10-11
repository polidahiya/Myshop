import "./globals.css";
import { Mulish, Tenor_Sans } from "next/font/google";
import { Appwrapper } from "./Context";
import Message from "./_globalcomps/Message";
import { Googleadsid } from "@/lib/data";
import Dialoguebox from "./_globalcomps/Dialoguebox";
import Showqrcode from "./_globalcomps/Qr/Createqrcode";
import Qrcodescanner from "./_globalcomps/Qr/Qrcodescanner";
import Googleanayltics from "./_globalcomps/Googleanalytics";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
});

const tenor = Tenor_Sans({
  variable: "--font-tenor",
  weight: "400", // Tenor Sans has only one weight
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "A2Z Stores",
  description: "Create your own store in minutes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* google analytics */}
        <Googleanayltics />
        {/* google adsense */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${Googleadsid}`}
          crossOrigin="anonymous"
        ></script>
        <meta name="google-adsense-account" content={Googleadsid} />
        {/* search console url verification */}
        <meta
          name="google-site-verification"
          content="Rvp7Y-_9q60aAlayucwyJhaYlYv0aTw-UOWMbTqa4Xs"
        />
      </head>
      {/* ✅ Mulish applied globally, Tenor available via class */}
      <body
        className={`${mulish.variable} ${tenor.variable} antialiased w-full max-w-[1920px] mx-auto text-[#525252]`}
      >
        <Appwrapper>
          {children}
          <Message />
          <Dialoguebox />
          <Showqrcode />
          <Qrcodescanner />
        </Appwrapper>
      </body>
    </html>
  );
}
