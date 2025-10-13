import React from "react";
import { Authfn } from "@/lib/auth";
import Link from "next/link";
import { FaStoreAlt } from "react-icons/fa";
import { MdLogin } from "react-icons/md";

async function layout({ children }) {
  const auth = await Authfn();
  const islogedin = auth?.verified;
  const havestore = auth?.storeid;
  return (
    <div>
      <header className="w-full flex items-center justify-between bg-white shadow-sm sticky top-0 z-30">
        <div className="px-6 py-4 flex items-center">
          <Link
            prefetch={false}
            href="/A2Z"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-md flex items-center justify-center text-white font-bold">
              A2Z
            </div>
            <div>
              <h1 className="text-lg font-semibold">A2Z</h1>
              <p className="text-xs text-gray-500">
                Create your online store — fast
              </p>
            </div>
          </Link>
        </div>
        <div className="flex gap-2 px-2 md:px-10 py-2 ">
          <Link
            prefetch={false}
            href={
              islogedin
                ? havestore
                  ? `/${havestore}`
                  : "/Store"
                : "/account/login?redirect=/Search"
            }
            className="w-full h-12 rounded-xl border border-slate-200 bg-theme text-white px-5 flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
          >
            {islogedin ? (
              havestore ? (
                <>
                  <FaStoreAlt /> My Store
                </>
              ) : (
                <>
                  <FaStoreAlt /> Create Store
                </>
              )
            ) : (
              <>
                <MdLogin /> Login
              </>
            )}
          </Link>
          {/* <Link prefetch={false}
          href={`/`}
          className="w-full h-12 rounded-xl border border-slate-200 bg-theme text-white px-5 flex items-center justify-center shadow-sm"
        >
          test
        </Link> */}
        </div>
      </header>
      {children}
    </div>
  );
}

export default layout;
