"use client";
import React from "react";
import { PiSmileySad } from "react-icons/pi";
import { Productctxfn } from "../Productcontext";
import Link from "next/link";

function Cartbutton({ product, whatsappnum }) {
  const MAX_QUANTITY = 10; // Define the maximum quantity
  const { quantity, setquantity, finalprice, finalmrp } = Productctxfn();

  const handleIncrement = () => {
    if (quantity < MAX_QUANTITY) setquantity((pre) => pre + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setquantity((pre) => pre - 1);
  };

  return (
    <div className="sticky bottom-0 bg-white py-1">
      <div className="flex items-center justify-between">
        <div className="h-14 flex items-stretch  w-fit border border-gray-200 lg:hover:border-black bg-white">
          {/* Decrement Button */}
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className={`flex items-center justify-center h-full aspect-square text-xl ${
              quantity <= 1 && "opacity-50"
            }`}
          >
            -
          </button>
          {/* display quantity */}
          <p className="flex items-center justify-center h-full w-5">
            {quantity}
          </p>
          {/* Increment Button */}
          <button
            onClick={handleIncrement}
            disabled={quantity >= MAX_QUANTITY}
            className={`flex items-center justify-center h-full aspect-square text-xl ${
              quantity >= MAX_QUANTITY && "opacity-50"
            }`}
          >
            +
          </button>
        </div>
        <div className="flex flex-col items-end gap-1">
          {finalmrp != finalprice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{finalmrp?.toLocaleString("en-IN")}
            </span>
          )}
          <span className="text-xl">
            ₹{finalprice?.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
      {/* add to cart button */}
      <Link
        href={`https://wa.me/${whatsappnum}?text=I%20want%20to%20buy%20this%20product.`}
        className="flex items-center justify-center h-14 w-full text-white bg-[var(--usertheme)] text-sm mt-2"
      >
        {product?.available ? (
          "Contact on Whatsapp"
        ) : (
          <span className="flex items-center justify-center gap-3">
            <PiSmileySad className="scale-[2]" />
            Currently Unavailable
          </span>
        )}
      </Link>
    </div>
  );
}

export default Cartbutton;
