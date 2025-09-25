import React from "react";

function Faq({ storeid, device, Component, compProps }) {
  return (
    <div>
      <Component storeid={storeid} device={device} {...compProps} />
    </div>
  );
}

export default Faq;
