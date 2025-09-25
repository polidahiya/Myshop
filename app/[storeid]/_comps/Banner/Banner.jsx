import React from "react";

function Banner({ storeid, device, Component, compProps }) {
  return (
    <div>
      <Component storeid={storeid} device={device} {...compProps} />
    </div>
  );
}

export default Banner;
