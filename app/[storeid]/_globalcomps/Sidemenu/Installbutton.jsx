"use client";
import React, { useState, useEffect } from "react";
import { MdInstallDesktop } from "react-icons/md";
import { MdInstallMobile } from "react-icons/md";

export default function Installbutton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      setIsVisible(false);
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-3 px-6 py-3 
                  hover:bg-gray-100 dark:hover:bg-zinc-800 
                  transition rounded-md"
          aria-label="Install app"
          title="Install app"
        >
          <MdInstallDesktop className="hidden md:block" size={18} />
          <MdInstallMobile className="md:hidden" size={18} />
          <span>Add Store to Home</span>
        </button>
      )}
    </>
  );
}
