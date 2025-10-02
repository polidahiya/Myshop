import React from "react";
import Clientpage from "./Clientpage";
import { Authfn } from "@/lib/auth";
import Link from "next/link";
import { FaStoreAlt } from "react-icons/fa";
import { MdLogin } from "react-icons/md";

async function page() {
  const auth = await Authfn();
  const islogedin = auth?.verified;
  const havestore = auth?.storeid;

  return (
    <div className="flex flex-col min-h-screen">
      <Clientpage />
      <div className="sticky bottom-0 flex gap-2 mt-auto px-2 md:px-10 py-2 w-full max-w-2xl mx-auto">
        <Link
          href={
            islogedin
              ? havestore
                ? `/${havestore}`
                : "/Store"
              : "/account/login?redirect=/Search"
          }
          className=" w-full h-12 rounded-xl border border-slate-200 bg-theme text-white flex items-center justify-center gap-2 shadow-sm"
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
        {/* <Link
          href={`/`}
          className="w-full h-12 rounded-xl border border-slate-200 bg-theme text-white flex items-center justify-center shadow-sm"
        >
          test
        </Link> */}
      </div>
    </div>
  );
}

export default page;
