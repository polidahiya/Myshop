import React from "react";
import Createstore from "./Createstore";
import Verification from "@/lib/verification";
import { redirect } from "next/navigation";

function page() {
  const tokenres = Verification("public");
  if (!tokenres?.verified) {
    redirect(`/account/login?redirect=/Store`);
  }
  return (
    <div>
      <Createstore />
    </div>
  );
}

export default page;
