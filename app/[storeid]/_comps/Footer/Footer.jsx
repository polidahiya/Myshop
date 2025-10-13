import React from "react";
import { socialPlatforms } from "@/lib/data";
import Link from "next/link";

function Footer({ social }) {
  return (
    <footer className="border-t mt-5 py-10 flex items-center justify-center gap-5 text-4xl">
      {Object.entries(social).map(([key, link], i) => {
        const Icon = socialPlatforms[key].icon;
        return (
          <Link prefetch={false}
            key={i}
            href={link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: socialPlatforms[key].color }}
          >
            {Icon}
          </Link>
        );
      })}
    </footer>
  );
}

export default Footer;
