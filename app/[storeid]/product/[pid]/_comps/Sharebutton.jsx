"use client";
import React from "react";
import Link from "next/link";
import { IoLogoFacebook, IoLogoPinterest } from "react-icons/io5";
import { TbLink } from "react-icons/tb";
import { RiTwitterXLine } from "react-icons/ri";
import { GoShareAndroid } from "react-icons/go";
import useDomain from "@/app/_globalcomps/Origin";
import copytoclipboard from "@/app/_globalcomps/Copytoclipboard";
import { AppContextfn } from "@/app/Context";

function Sharebutton({ sku, description, image }) {
  const { setmessagefn } = AppContextfn();
  const domain = useDomain();
  const list = [
    {
      title: "Facebook",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        `${domain}/product/${sku}`
      )}`,
      icon: <IoLogoFacebook />,
    },
    {
      title: "Twitter",
      link: `https://twitter.com/share?url=${encodeURIComponent(
        `${domain}/product/${sku}`
      )}&text=${encodeURIComponent(description)}`,
      icon: <RiTwitterXLine />,
    },
    {
      title: "Pinterest",
      link: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
        `${domain}/product/${sku}`
      )}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(
        description
      )}`,
      icon: <IoLogoPinterest />,
    },
  ];
  // share page
  const handleSharePage = () => {
    const link = typeof window !== "undefined" ? new URL(location.href) : "";
    copytoclipboard(link, () => {
      setmessagefn("Link copied!");
    });
  };

  const Moreshare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check out this amazing page!",
          url: window.location.href,
        });
        console.log("Shared successfully");
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch {
        alert("Cannot share this page.");
      }
    }
  };

  return (
    <div className="group relative flex items-center gap-2 text-[var(--usertheme)] lg:hover:text-black cursor-pointer mt-4 w-fit">
      <GoShareAndroid className="text-2xl" />
      <p className="relative">Share</p>
      <div className="absolute top-0 right-0 w-full hidden group-hover:block">
        <div className="w-44 mt-10 float-left px-5 py-4 bg-white text-[var(--usertheme)] text-sm border border-[var(--usertheme)]">
          {list.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 flex items-center gap-3"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-black">{item.title}</span>
            </Link>
          ))}
          <button
            className="py-2 flex items-center gap-3 "
            onClick={handleSharePage}
          >
            <TbLink className="text-lg" />
            <span className="text-black">Copy Link</span>
          </button>
          <button className="py-2 flex items-center gap-3 " onClick={Moreshare}>
            <GoShareAndroid className="text-lg" />
            <span className="text-black">More</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sharebutton;
