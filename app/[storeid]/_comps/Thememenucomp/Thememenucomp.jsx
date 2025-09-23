"use client";
import React from "react";
import { Storehomectxfn } from "../../Storecontext";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { Updatehome } from "../../Edithome/Serveraction";
import { AppContextfn } from "@/app/Context";
import Revalidatepathfn from "@/app/_globalcomps/Revalidatepathfn";

export default function Thememenucomp({ Compdata, storeid }) {
  const { setmessagefn } = AppContextfn();
  const { thememenu, setthememenu } = Storehomectxfn();

  return (
    <>
      {thememenu.show && (
        <div className="fixed top-0 left-0 h-dvh w-full flex items-center justify-center bg-black/20 z-40 p-2">
          <div className="w-full max-w-3xl bg-white flex flex-col rounded-3xl">
            {/* header */}
            <div className="flex p-2 items-center">
              <div className="flex-1 font-tenor text-2xl pl-5">
                {thememenu?.category}
              </div>
              <button
                className="w-10 aspect-square rounded-full bg-gray-200"
                onClick={() => setthememenu((pre) => ({ ...pre, show: false }))}
              >
                X
              </button>
            </div>
            {/* body */}
            <div className="flex flex-wrap gap-5 p-5 max-h-96 overflow-y-auto mb-5">
              {Compdata[thememenu?.data?.category].map((item, i) => (
                <div
                  key={i}
                  className="w-44 aspect-square rounded cursor-pointer overflow-hidden shrink-0"
                  onClick={async () => {
                    const newdata = {
                      ...thememenu?.data,
                      type: i + 1,
                    };

                    const res = await Updatehome(
                      newdata,
                      false,
                      thememenu?.at,
                      []
                    );
                    setmessagefn(res.message);
                    if (res.status == 200) Revalidatepathfn(`/${storeid}`);
                    setthememenu((pre) => ({ ...pre, show: false }));
                  }}
                >
                  <Nextimage
                    src={item.img}
                    alt={`${item?.type} image`}
                    width={500}
                    height={500}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
