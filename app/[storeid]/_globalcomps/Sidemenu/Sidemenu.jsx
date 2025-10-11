"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AppContextfn } from "@/app/Context";
import { FaUser, FaSignOutAlt, FaCog, FaStore, FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { IoQrCodeOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { logout } from "@/app/account/Serveraction";
import { IoBookmarks } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { Saveitems } from "@/app/_globalcomps/Saveitems";

function Sidemenu({ auth, storeid, issavedstore = false }) {
  const path = usePathname();
  const { verified } = auth;
  const { showsidemenu, setshowsidemenu, setshowqr, setmessagefn } =
    AppContextfn();
  const [localissavedstore, setlocalissavedstore] = useState(issavedstore);

  return (
    <AnimatePresence>
      {showsidemenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full h-dvh bg-black/10 dark:bg-black/40 z-40 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-0 left-0 w-72 h-full flex flex-col 
              bg-white text-gray-900 
              dark:bg-zinc-900 dark:text-white 
              z-10`}
          >
            {/* User Info */}
            <div className="flex flex-col items-center gap-3 py-8 border-b border-gray-200 dark:border-zinc-700">
              <div
                className="w-20 h-20 rounded-full 
                bg-gray-200 dark:bg-zinc-700 
                flex items-center justify-center text-xl font-semibold"
              >
                <FaUser size={40} />
              </div>
              <p className="font-medium">Username</p>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                {auth?.email}
              </p>
            </div>

            {/* Menu */}
            <div className="flex flex-col py-4">
              <Link
                href={"/Search"}
                onClick={() => setshowsidemenu(false)}
                className="flex items-center gap-3 px-6 py-3 
                hover:bg-gray-100 dark:hover:bg-zinc-800 
                transition rounded-md"
              >
                <FaSearch size={18} />
                <span>Search a Store</span>
              </Link>
              {auth?.storeid ? (
                <div className="relative">
                  <Link
                    href={`/${auth?.storeid}`}
                    onClick={() => setshowsidemenu(false)}
                    className="flex items-center gap-3 px-6 py-3 
                  hover:bg-gray-100 dark:hover:bg-zinc-800 
                  transition rounded-md"
                  >
                    <FaStore size={18} />
                    <span>My Store</span>
                  </Link>
                  <button
                    className="absolute right-6 top-0 h-full aspect-square flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 
                  transition rounded-md"
                    onClick={() => {
                      setshowqr({
                        show: true,
                        link: `${window.location.origin}/${auth?.storeid}`,
                      });
                    }}
                  >
                    <IoQrCodeOutline />
                  </button>
                </div>
              ) : (
                <Link
                  href={"/Store"}
                  onClick={() => setshowsidemenu(false)}
                  className="flex items-center gap-3 px-6 py-3 
                  hover:bg-gray-100 dark:hover:bg-zinc-800 
                  transition rounded-md"
                >
                  <FaStore size={18} />
                  <span>+ Create your Store</span>
                </Link>
              )}
            </div>

            <hr className="border-gray-200 dark:border-zinc-700" />

            <div className="flex flex-col py-4">
              <Link
                href={"/Store/Update"}
                onClick={() => setshowsidemenu(false)}
                className="flex items-center gap-3 px-6 py-3 
                  hover:bg-gray-100 dark:hover:bg-zinc-800 
                  transition rounded-md"
              >
                <FaCog size={18} />
                <span>Update Store Details</span>
              </Link>

              <div className="relative">
                <Link
                  href={`/Mysaves?type=savedstores`}
                  onClick={() => setshowsidemenu(false)}
                  className="flex items-center gap-3 px-6 py-3 
                  hover:bg-gray-100 dark:hover:bg-zinc-800 
                  transition rounded-md"
                >
                  <IoBookmarks size={18} />
                  <span>Saved Items</span>
                </Link>
                <button
                  className="absolute right-6 top-0 h-full aspect-square flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 
                  transition rounded-md"
                  title={
                    localissavedstore ? "Remove this store" : "Saved this store"
                  }
                  onClick={async () => {
                    setlocalissavedstore((pre) => !pre);
                    const res = await Saveitems("Store", storeid);
                    if (res.status != 200) setlocalissavedstore((pre) => !pre);

                    setshowsidemenu(false);
                  }}
                >
                  {localissavedstore ? (
                    <IoBookmark size={18} />
                  ) : (
                    <IoBookmarkOutline size={18} />
                  )}
                </button>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-zinc-700" />

            {/* Logout / Login */}
            <div className="py-4 px-6 mt-auto">
              <Link
                href={verified ? "/" : `/account/login?redirect=${path}`}
                onClick={async (e) => {
                  if (verified) {
                    e.preventDefault();
                    const res = await logout();
                    if (res.status === 200) {
                      setshowsidemenu(false);
                      setmessagefn(res?.message);
                    }
                  } else {
                    setshowsidemenu(false);
                  }
                }}
                className={`flex items-center justify-center gap-3 py-3 rounded-md transition font-medium
                  ${
                    verified
                      ? "bg-red-600 hover:bg-red-500 text-white"
                      : "bg-theme hover:bg-theme text-white"
                  }`}
              >
                <FaSignOutAlt size={18} />
                <span>{verified ? "Logout" : "Login"}</span>
              </Link>
            </div>

            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-2xl w-10 aspect-square flex items-center justify-center"
              onClick={() => setshowsidemenu(false)}
            >
              <RxCross2 />
            </button>
          </motion.div>

          {/* Overlay click to close */}
          <button
            className="absolute top-0 left-0 h-full w-full"
            onClick={() => setshowsidemenu(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidemenu;
