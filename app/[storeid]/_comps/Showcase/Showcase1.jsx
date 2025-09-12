import React from "react";

function Showcase1({ items }) {
  // Expected 4 items in array
  if (!items || items.length < 4) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Left column */}
      <div>
        <div className="w-full aspect-[2/1]">
          <img
            src={items[0].img}
            alt=""
            className={`h-full w-full ${
              items[0].cover ? "object-cover" : "object-contain"
            }`}
          />
        </div>
        <div className="w-full aspect-square mt-2">
          <img
            src={items[1].img}
            alt=""
            className={`h-full w-full ${
              items[1].cover ? "object-cover" : "object-contain"
            }`}
          />
        </div>
      </div>

      {/* Right column */}
      <div>
        <div className="w-full aspect-square">
          <img
            src={items[2].img}
            alt=""
            className={`h-full w-full ${
              items[2].cover ? "object-cover" : "object-contain"
            }`}
          />
        </div>
        <div className="w-full aspect-[2/1] mt-2">
          <img
            src={items[3].img}
            alt=""
            className={`h-full w-full ${
              items[3].cover ? "object-cover" : "object-contain"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default Showcase1;
