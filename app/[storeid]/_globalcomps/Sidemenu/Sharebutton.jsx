"use client";
import React from "react";
import { PiShareNetworkFill } from "react-icons/pi";

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
      className="flex items-center gap-3 px-6 py-3 
                  hover:bg-gray-100 dark:hover:bg-zinc-800 
                  transition rounded-md"
      onClick={Moreshare}
    >
      <PiShareNetworkFill size={18} />
      <span>Share</span>
    </button>
  );
}

export default Sharebutton;
