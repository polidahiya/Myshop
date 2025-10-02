import React from "react";

export default async function Slider({
  storeid,
  device,
  Component,
  compProps,
}) {
  const imageDimensions = {
    mobile: { width: 375 },
    tablet: { width: 768 },
    desktop: { width: 1280 },
  };
  return (
    <div>
      <Component
        storeid={storeid}
        device={device}
        imageDimensions={imageDimensions}
        {...compProps}
      />
    </div>
  );
}
