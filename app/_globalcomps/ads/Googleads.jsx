"use client";
import { useEffect } from "react";
import { Googleadsid } from "@/lib/data";

export default function Googleads({ type = 1 }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  const adstypes = {
    1: "1580670740", //square
    2: "9477178929", //16:9
    3: "2033803177", //9:16
  };
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "auto" }}
        data-ad-client={Googleadsid}
        data-ad-slot={adstypes[type]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
}
