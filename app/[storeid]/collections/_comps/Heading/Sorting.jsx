"use client";
import React, { useState, useEffect, useRef } from "react";
import { TbSortDescending } from "react-icons/tb";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function Sorting({ sort }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // to detect outside click

  const sortoptions = [
    { label: "Default", action: 0 },
    { label: "Price: Low to High", action: 1 },
    { label: "Price: High to Low", action: 2 },
  ];

  const generateHref = (action) => {
    const params = new URLSearchParams(searchParams.toString());
    if (action == "0") {
      params.delete("sort");
    } else {
      params.set("sort", action);
    }
    return `${pathname}?${params.toString()}`;
  };

  // 🔹 Toggle menu on button click
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // 🔹 Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative z-10">
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white rounded-md shadow cursor-pointer lg:hover:text-[var(--usertheme)]"
      >
        <TbSortDescending className="w-4 h-4" />
        <span className="hidden md:inline-block">Sort</span>
      </button>

      {/* dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 translate-y-2 p-2 text-sm text-gray-600 bg-white rounded-md shadow">
          {sortoptions.map((item, i) => (
            <Link
              key={i}
              href={generateHref(item.action)}
              onClick={() => setIsOpen(false)} // close on click
              className={`block whitespace-nowrap text-sm py-1 lg:hover:text-[var(--usertheme)] ${
                sort == item.action && "text-[var(--usertheme)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sorting;
