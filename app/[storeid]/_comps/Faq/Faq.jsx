import React from "react";

function Faq({ storeid, device, Component, compProps }) {
  return (
    <div className="py-2 md:py-5">
      <Component storeid={storeid} device={device} {...compProps} />
    </div>
  );
}

export default Faq;
