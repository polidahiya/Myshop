import React from "react";
import Hero1 from "./_comps/Hero1";

const types = {
  1: Hero1,
};

export default function Hero({ storeid, comp }) {
  const Component = types[comp.type];
  return (
    <div>
      <Component storeid={storeid} items={comp?.items} />
    </div>
  );
}
