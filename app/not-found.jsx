import React from "react";
import Nextimage from "./_globalcomps/Nextimage";
import Link from "next/link";

function notfound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh]">
      <Nextimage
        src="/notfoundimages/page.jpg"
        alt="404"
        width={500}
        height={500}
        loading="lazy"
        className="w-full max-w-xl"
      />
      <div className="flex items-center justify-center">
        <Link href={"/Search"} className="px-5 py-2 bg-theme text-white">
          Search a Store
        </Link>
      </div>
    </div>
  );
}

export default notfound;
