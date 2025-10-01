import React from "react";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Editbuttons from "./Editbuttons";

function Productcard({ storeid = null, product, isadmin = false }) {
  return (
    <div className="relative">
      <Link
        href={`/${storeid || product?.storeid}/product/${product?._id}`}
        className="w-full"
      >
        <Nextimage
          src={product?.images[0]}
          alt={product?.name}
          height={500}
          width={500}
          loading="lazy"
          className="w-full aspect-square object-cover"
        />
        <div className="px-4 pt-4">
          <p className="text-sm text-[var(--theme)] mt-[6px] hidden lg:block">
            {product?.theme}
          </p>
          <p className="flex items-center justify-between flex-wrap mt-[6px]">
            <span className="line-clamp-2">{product?.name}</span>
            <span className="">
              Rs {parseInt(product?.price, 10).toLocaleString("en-IN")}
            </span>
          </p>
        </div>
      </Link>
      {isadmin && <Editbuttons product={product} storeid={storeid} />}
    </div>
  );
}

export default Productcard;
