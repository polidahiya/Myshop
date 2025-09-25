import React from "react";

async function Showcase1({ storeid, title = "", items = [], products = [] }) {
  console.log(products);

  return (
    <div className="">
      <div>{title}</div>
      <div></div>
    </div>
  );
}

export default Showcase1;
