"use client";
import React from "react";
import { GoShareAndroid } from "react-icons/go";

function Sharebutton({}) {
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
    <button
      className="flex items-center gap-2 text-[var(--usertheme)] hover:text-black cursor-pointer mt-4 w-fit"
      onClick={Moreshare}
    >
      <GoShareAndroid className="text-2xl" />
      <span>Share</span>
    </button>
  );
}

export default Sharebutton;
