import React from "react";

function About({ storeid, device, Component, compProps }) {
  return (
    <div>
      <Component storeid={storeid} device={device} {...compProps} />
    </div>
  );
}

export default About;
