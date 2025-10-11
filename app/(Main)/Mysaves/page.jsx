import React from "react";
import { Getsaveditems } from "@/app/_globalcomps/Saveitems";
import { notFound } from "next/navigation";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Link from "next/link";
import Ads from "@/app/[storeid]/collections/_comps/Ads";
import { testimage } from "@/lib/data";
import Backbutton from "./Backbutton";
import Bookmarkbutton from "./Bookmarkbutton";

async function page({ searchParams }) {
  const { type } = await searchParams;
  if (!["savedstores", "savedproducts"].includes(type)) return notFound();

  const saveditems = await Getsaveditems();
  if (saveditems.status !== 200) return notFound();

  const istoretype = type == "savedstores";

  return (
    <div className="px-2 md:px-10 py-5">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Backbutton />
        My Saves
      </h1>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {[
            {
              title: "Stores",
              type: "savedstores",
            },
            {
              title: "Products",
              type: "savedproducts",
            },
          ].map((item, i) => (
            <Link
              key={i}
              href={`/Mysaves?type=${item.type}`}
              className={`px-4 py-2 border border-theme rounded-md ${
                item.type == type && "bg-theme text-white"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <Link
          href="/Search"
          className="px-4 py-2 border border-theme rounded-md bg-theme text-white"
        >
          Search a store
        </Link>
      </div>
      <div className="mt-5">
        {saveditems[type].length == 0 ? (
          <div className="flex justify-center mt-5">
            <Nextimage
              src="/productnotfound.png"
              alt="noresult"
              width={500}
              height={500}
              quality={100}
            />
          </div>
        ) : (
          <div
            className={
              istoretype
                ? `mt-5 space-y-5 w-full max-w-2xl mx-auto`
                : `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10`
            }
          >
            {saveditems[type].map((item, i) => (
              <React.Fragment key={saveditems[type] + i}>
                <div className="relative">
                  <Link
                    href={
                      istoretype
                        ? `/${item?._id}`
                        : `/${item?.storeid}/product/${item?._id}`
                    }
                    className={istoretype ? `flex items-center gap-2 h-10` : ``}
                  >
                    <Nextimage
                      src={
                        (istoretype ? item?.logo : item?.images[0]) || testimage
                      }
                      alt={istoretype ? "Logo" : item?.name}
                      height={istoretype ? 40 : 500}
                      width={istoretype ? 40 : 500}
                      className={
                        istoretype
                          ? `aspect-square object-cover rounded-full`
                          : `w-full aspect-square object-cover`
                      }
                    />
                    {istoretype ? (
                      <p className={`text-center line-clamp-1`}>
                        {item?.storename}
                      </p>
                    ) : (
                      <div className="px-4 pt-4">
                        <p className="flex items-center justify-between flex-wrap">
                          <span className="line-clamp-2">{item?.name}</span>
                          <span className="">
                            Rs{" "}
                            {parseInt(item?.price, 10).toLocaleString("en-IN")}
                          </span>
                        </p>
                      </div>
                    )}
                  </Link>
                  <Bookmarkbutton istoretype={istoretype} id={item._id} />
                </div>
                <Ads i={i} />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
