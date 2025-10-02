"use client";
import React from "react";
import { PiShareFatLight } from "react-icons/pi";

const ShareButton = () => {
  const handleShare = async () => {
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
      onClick={handleShare}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white rounded-md shadow cursor-pointer lg:hover:text-[var(--usertheme)]"
    >
      <PiShareFatLight />
    </button>
  );
};

export default ShareButton;
