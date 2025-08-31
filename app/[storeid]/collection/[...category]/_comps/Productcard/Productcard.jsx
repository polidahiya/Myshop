import React from "react";
import Link from "next/link";

function Productcard({ storeid }) {
  return (
    <Link href={`/${storeid}/product/productid`} className="w-full">
      <img
        src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/8af1411a-676f-42f9-802f-4098241f19be/b6bfaffb241a4dcfb9604794baf44011.webp"
        alt=""
        className="w-full aspect-square object-cover"
      />
      <div>
        <p className=" font-tenor">
          this is the name of the product this is the name of the product
        </p>
      </div>
    </Link>
  );
}

export default Productcard;
