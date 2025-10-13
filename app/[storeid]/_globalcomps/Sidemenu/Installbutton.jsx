"use client";
import React from "react";
import { MdInstallDesktop } from "react-icons/md";
import { MdInstallMobile } from "react-icons/md";
import { Storehomectxfn } from "../../Storecontext";

export default function Installbutton() {
  const {
    installprompt,
    setinstallprompt,
    installvisiable,
    setinstallvisiable,
  } = Storehomectxfn();

  const handleInstallClick = async () => {
    if (installprompt) {
      setinstallvisiable(false);
      installprompt.prompt();
      const { outcome } = await installprompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setinstallprompt(null);
    }
  };

  return (
    <>
      {installvisiable && (
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
        </button>
      )}
    </>
  );
}
