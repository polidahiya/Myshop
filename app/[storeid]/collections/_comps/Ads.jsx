import React from "react";
import Googleads from "@/app/_globalcomps/ads/Googleads";

function Ads({ i }) {
  return null;
  return (
    <>
      {/* small and lg devices ads */}
      {(i + 1) % 10 == 0 && (
        <div className="h-40 w-full bg-pink-200 col-span-2 md:col-span-3 lg:col-span-5 md:hidden lg:block">
          <Googleads type={2} />
        </div>
      )}
      {/* md devices ads */}
      {(i + 1) % 9 == 0 && (
        <div className="h-40 w-full bg-pink-200 col-span-2 md:col-span-3 lg:col-span-5 hidden md:block lg:hidden">
          <Googleads type={2} />
        </div>
      )}
    </>
  );
}

export default Ads;
