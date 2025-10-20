import React from "react";
import Script from "next/script";

function Monetag() {
  return (
    <Script>
      {`(function(s){s.dataset.zone='10065924',s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
    </Script>
  );
}

export default Monetag;
