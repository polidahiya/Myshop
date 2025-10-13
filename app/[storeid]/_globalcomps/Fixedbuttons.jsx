"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FaArrowUpLong } from "react-icons/fa6";
import { usePathname } from "next/navigation";

function FIxedbuttons({ whatsapp, storename }) {
  const path = usePathname();
  const isproductpage = path.includes("product");

  return (
    <div
      className={`fixed  ${
        isproductpage ? "bottom-36" : "bottom-5"
      } right-5 md:right-10 flex flex-col items-end gap-2 z-30 print:hidden`}
    >
      <Gotopbutton />
      <Whatsappbutton whatsapp={whatsapp} storename={storename} />
      {/* <Helpbutton /> */}
    </div>
  );
}

const Whatsappbutton = ({ whatsapp, storename }) => (
  <Link prefetch={false}
    href={`https://wa.me/+91${whatsapp?.replace(
      / /g,
      ""
    )}?text=${encodeURIComponent(
      "Hi " +
        storename +
        ", I found your products interesting, and I would like to know more!"
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className={`group  flex items-center justify-center p-1 rounded-full overflow-hidden bg-[var(--usertheme)]`}
    prefetch={false}
  >
    <span className="text-white opacity-0 text-sm  max-w-0 lg:group-hover:opacity-100 lg:group-hover:max-w-60  lg:group-hover:px-5 whitespace-nowrap transition-all duration-300 ease-in-out">
      Chat with us on WhatsApp
    </span>
    <span
      className={`h-8 aspect-square rounded-full bg-white  grid place-content-center text-[var(--usertheme)]`}
    >
      <FaWhatsapp className="text-lg" />
    </span>
  </Link>
);

const Helpbutton = () => (
  <Link prefetch={false}
    href={"/Contact"}
    className={`group  flex items-center justify-center p-1 rounded-full overflow-hidden bg-[var(--usertheme)]`}
    prefetch={false}
  >
    <span className="text-white opacity-0 text-sm  max-w-0 lg:group-hover:opacity-100 lg:group-hover:max-w-32  lg:group-hover:px-5 whitespace-nowrap transition-all duration-300 ease-in-out">
      Need Help
    </span>
    <span
      className={`h-8 aspect-square rounded-full bg-white  grid place-content-center text-[var(--usertheme)]`}
    >
      ?
    </span>
  </Link>
);

const Gotopbutton = () => {
  const [scrolltop, setscrolltop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 1000;
      if (shouldShow != scrolltop) setscrolltop(shouldShow);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolltop]);

  return (
    <button
      className={`group flex flex-col items-center justify-center gap-1 text-sm  
          text-white h-10 w-10 lg:hover:h-16 rounded-full
         overflow-hidden duration-300 ${
           !scrolltop && "opacity-0 pointer-events-none"
         } bg-[var(--usertheme)]`}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      aria-label="Go to Top"
      title="Go to Top"
    >
      <FaArrowUpLong className="translate-y-[2px]" />
      <span className="h-0 m-0 p-0 opacity-0 lg:group-hover:opacity-100 lg:group-hover:h-4 duration-300">
        Top
      </span>
    </button>
  );
};

export default FIxedbuttons;
