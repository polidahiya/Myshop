import React from "react";
import { notFound } from "next/navigation";
import Loginpage from "./Loginpage";
import Signuppage from "./Signuppage";

async function page({ params }) {
  const { type } = await params;
  if (!(type == "login" || type == "signup")) notFound();
  const redirectLink = "/";
  return (
    <div>
      {type == "login" && <Loginpage redirectLink={redirectLink} />}
      {type == "signup" && <Signuppage redirectLink={redirectLink} />}
    </div>
  );
}

export default page;
