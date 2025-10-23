import React from "react";
import Googleads from "@/app/_globalcomps/ads/Googleads";

function Ads({ i }) {
  return (
    <>
      {(i + 1) % 5 == 0 && (
        // <div className="test">
        <Googleads type={1} />
        // </div>
      )}
    </>
  );
}

export default Ads;
