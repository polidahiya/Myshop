"use client";
import React, { useMemo, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import Standardinputfield from "@/app/_globalcomps/inputfields/Standardinputfield";
import { Edithomectxfn } from "../../Edithomecontext";
import Nextimage from "@/app/_globalcomps/Nextimage";

export default function Showcase({ products }) {
  const { data, setdata } = Edithomectxfn();

  const selectedlist = data?.props?.items;
  const addedproducts = useMemo(() => {
    return selectedlist
      ?.map((id) => products.find((p) => p._id === id))
      .filter(Boolean);
  }, [selectedlist, products]);

  const moveslide = (index, direction) => {
    const updated = { ...data.props };
    const items = [...updated.items]; // clone for safety
    const newIndex = index + direction;

    if (newIndex >= 0 && newIndex < items.length) {
      [items[index], items[newIndex]] = [items[newIndex], items[index]];
      updated.items = items;
      setdata((pre) => ({ ...pre, props: updated }));
    }
  };


  return (
    <div className="mt-5 p-4 border rounded-md space-y-2">
      <Standardinputfield
        titlename="Title"
        value={data?.props?.title}
        onchange={(e) => {
          const updated = { ...data.props };
          updated.title = e.target.value;
          setdata((pre) => ({ ...pre, props: updated }));
        }}
        clear={() => {
          const updated = { ...data.props };
          updated.title = "";
          setdata((pre) => ({ ...pre, props: updated }));
        }}
      />
      <div className="flex items-center gap-2 overflow-x-scroll">
        {addedproducts.map((product, i) => (
          <div key={i} className="flex w-28 shrink-0 gap-2 flex-col">
            <div>
              <Nextimage
                src={product?.images[0]}
                alt={product?.name}
                height={500}
                width={500}
                loading="lazy"
                className="w-full aspect-square object-cover"
              />
              <p className="line-clamp-1">{product?.name}</p>
            </div>
            {/* controls */}
            <div className="flex gap-2 h-8 w-full">
              <button
                type="button"
                onClick={() => moveslide(i, -1)}
                className="flex-1 aspect-square text-sm border rounded-md"
              >
                <BsArrowLeftShort className="inline-block" />
              </button>
              <button
                type="button"
                onClick={() => moveslide(i, 1)}
                className="flex-1 aspect-square text-sm border rounded-md"
              >
                <BsArrowLeftShort className="inline-block rotate-180" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link prefetch={false}selector
        products={products}
        selected={selectedlist}
        callback={(list) => {
          const updated = { ...data.props };
          updated.items = list;
          setdata((pre) => ({ ...pre, props: updated }));
        }}
      />
    </div>
  );
}

function Linkselector({ products, selected = [], callback = () => {} }) {
  const [show, setshow] = useState(false);
  const [items, setitems] = useState(selected);

  return (
    <div>
      <button
        type="button"
        className="border rounded-md py-2 w-full"
        onClick={() => setshow(true)}
      >
        Select Products
      </button>
      {show && (
        <div className="fixed top-0 left-0 h-dvh w-full flex items-center justify-center bg-black/20 z-40 p-2">
          <div className="w-full max-w-3xl bg-white flex flex-col rounded-3xl">
            {/* header */}
            <div className="p-2">
              <div className="flex items-center">
                <div className="flex-1 font-tenor text-2xl pl-5">Link to</div>
                <button
                  type="button"
                  className="w-10 aspect-square rounded-full bg-gray-200"
                  onClick={() => setshow(false)}
                >
                  X
                </button>
              </div>
            </div>
            {/* body */}
            <div className="flex flex-col p-5 max-h-96 overflow-y-auto mb-5">
              <div className="grid grid-cols-3 gap-0.5 ">
                {products.map((product, i) => {
                  const selectedoption = items.includes(product._id);
                  return (
                    <div
                      key={i}
                      className=" relative"
                      onClick={() => {
                        const updated = [...items];
                        if (selectedoption) {
                          updated.splice(updated.indexOf(product._id), 1);
                        } else {
                          updated.push(product._id);
                        }
                        setitems(updated);
                      }}
                    >
                      <div
                        className={`flex items-center justify-center absolute top-0 right-0 w-5 aspect-square text-white ${
                          selectedoption
                            ? "bg-theme"
                            : "bg-white border border-theme"
                        }`}
                      >
                        {selectedoption && "✓"}
                      </div>
                      <Nextimage
                        src={product?.images[0]}
                        alt={product?.name}
                        height={500}
                        width={500}
                        loading="lazy"
                        className="w-full aspect-square object-cover"
                      />
                      <div className="px-4">
                        <p className="flex items-center justify-between flex-wrap mt-[6px]">
                          <span className="line-clamp-2">{product?.name}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="border rounded-md py-2 px-5 bg-theme text-white mt-5"
                  onClick={() => {
                    callback(items);
                    setshow(false);
                  }}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
