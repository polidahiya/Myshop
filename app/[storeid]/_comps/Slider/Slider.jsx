import React from "react";

export default async function Slider({
  storeid,
  device,
  Component,
  compProps,
}) {
  return (
    <div>
      <Component storeid={storeid} device={device} {...compProps} />
    </div>
  );
}
