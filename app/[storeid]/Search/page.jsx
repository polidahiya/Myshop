import React from "react";
import Clientpage from "./Clientpage";
import { Authfn } from "@/lib/auth";

async function page({ params }) {
  const { storeid } = await params;
  const { isadmin } = await Authfn(storeid);
  return (
    <div>
      <Clientpage storeid={storeid} isadmin={isadmin} />
    </div>
  );
}

export default page;
