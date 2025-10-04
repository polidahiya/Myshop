"use client";
import React, { useEffect, useState } from "react";
import { PiSmileySad } from "react-icons/pi";
import { Productctxfn } from "../Productcontext";
import Link from "next/link";

function Cartbutton({ product, whatsappnum }) {
  const MAX_QUANTITY = 10; // Define the maximum quantity
  const { selectedoptions, quantity, setquantity, finalprice, finalmrp } =
    Productctxfn();

  const [url, seturl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      seturl(window.location.href);
    }
  }, []);

  const handleIncrement = () => {
    if (quantity < MAX_QUANTITY) setquantity((pre) => pre + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setquantity((pre) => pre - 1);
  };

  const selectedOptionsText = product?.options
    ?.map(
      (opt, i) =>
        `${opt?.name}: ${
          opt?.options?.[selectedoptions[i] || 0]?.name || "N/A"
        }`
    )
    .join("\n");

  const message =
    `🛒 *I want to buy this product!*\n\n` +
    `🔗 *Product:* ${url}\n` +
    `📦 *Quantity:* ${quantity}\n` +
    (selectedOptionsText
      ? `✨ *Selected Options:*\n${selectedOptionsText}\n\n`
      : "") +
    `Please share more details.`;

  const whatsappLink = `https://wa.me/91${whatsappnum}?text=${encodeURIComponent(
    message
  )}`;

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
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        prefetch={false}
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
