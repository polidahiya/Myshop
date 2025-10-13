"use client";
import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import Imageuploader from "@/app/_globalcomps/inputfields/Imageuploader";
import Standardinputfield from "@/app/_globalcomps/inputfields/Standardinputfield";
import Linkselector from "@/app/_globalcomps/inputfields/Linkselector";
import Togglebuttons from "@/app/_globalcomps/inputfields/Togglebuttons";
import { AiOutlinePlus } from "react-icons/ai";
import { Edithomectxfn } from "../../Edithomecontext";
import { AppContextfn } from "@/app/Context";

function Slider({ collections, products }) {
  const { setmessagefn } = AppContextfn();
  const { data, setdata, setdeletedimages, setnewadded } = Edithomectxfn();

  const moveslide = (index, direction) => {
    const updated = { ...data.props };
    const items = updated.items;
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < items.length) {
      [items[index], items[newIndex]] = [items[newIndex], items[index]];
      setdata((pre) => ({ ...pre, props: updated }));
    }
  };

  const Deleteslide = (index) => {
    // Store deleted images
    const image = data.props?.items[index]?.img;
    setdeletedimages((pre) => [...pre, image]);
    // remove slide

    const updated = { ...data.props };
    updated.items = updated.items.filter((_, i) => i !== index);
    setdata((pre) => ({ ...pre, props: updated }));
  };

  return (
    <div className="mt-5 p-4 border rounded-md">
      <div className="flex items-center gap-2 overflow-x-scroll">
        {data?.props?.items.map((item, i) => (
          <div key={i} className="flex w-96 shrink-0 gap-2 flex-col">
            <div className="w-full !aspect-[2/1] h-1/2">
              <Imageuploader
                img={item?.img}
                setdeletedimages={setdeletedimages}
                setnewadded={setnewadded}
                cover={item?.cover}
                folder={"Mystore"}
                dimension={1920}
                size={1}
                callback={(img) => {
                  const updated = { ...data.props };
                  updated.items[i].img = img;
                  setdata((pre) => ({ ...pre, props: updated }));
                }}
                remove={() => {
                  const updated = { ...data.props };
                  updated.items[i].img = "";
                  setdata((pre) => ({ ...pre, props: updated }));
                }}
              />
            </div>
            <Togglebuttons
              titlename="Image Frame"
              value={item?.cover}
              positive={() => {
                const updated = { ...data.props };
                updated.items[i].cover = true;
                setdata((pre) => ({ ...pre, props: updated }));
              }}
              negative={() => {
                const updated = { ...data.props };
                updated.items[i].cover = false;
                setdata((pre) => ({ ...pre, props: updated }));
              }}
              positiveText="Cover"
              negativeText="Contain"
            />

            <Standardinputfield
              titlename="Title"
              value={data?.props?.items[i]?.title}
              onchange={(e) => {
                const updated = { ...data.props };
                updated.items[i].title = e.target.value;
                setdata((pre) => ({ ...pre, props: updated }));
              }}
              clear={() => {
                const updated = { ...data.props };
                updated.items[i].title = "";
                setdata((pre) => ({ ...pre, props: updated }));
              }}
            />
            {/* dsec */}
            <Standardinputfield
              titlename="Description"
              value={data?.props?.items[i]?.desc}
              onchange={(e) => {
                const updated = { ...data.props };
                updated.items[i].desc = e.target.value;
                setdata((pre) => ({ ...pre, props: updated }));
              }}
              clear={() => {
                const updated = { ...data.props };
                updated.items[i].desc = "";
                setdata((pre) => ({ ...pre, props: updated }));
              }}
            />
            <Link prefetch={false}selector
              collections={collections}
              products={products}
              selected={{
                type: item?.link?.type,
                id: item?.link?.id,
                collection: item?.link?.collection,
              }}
              callback={({ type, id, collection }) => {
                const updated = { ...data.props };
                updated.items[i].link.type = type;
                updated.items[i].link.id = id;
                updated.items[i].link.collection = collection;
                setdata((pre) => ({ ...pre, props: updated }));
              }}
            />

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
              <button
                type="button"
                onClick={() => Deleteslide(i)}
                className="flex-1 aspect-square text-sm border rounded-md"
              >
                <MdDeleteOutline className="inline-block" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            if (data?.props?.items.length >= 11) {
              setmessagefn("Maximum slides limit reached");
              return;
            }
            const updated = { ...data.props };
            updated.items.push({
              img: "",
              cover: true,
              title: "",
              desc: "",
              link: { type: "", id: "", collection: ["", ""] },
            });
            setdata((pre) => ({ ...pre, props: updated }));
          }}
          className="group relative flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-slate-300 hover:border-theme hover:bg-blue-50 transition-all duration-200 ease-in-out p-5"
        >
          <AiOutlinePlus className="h-10 w-10 text-slate-400 group-hover:text-theme transition-colors" />
          <span className="mt-2 text-sm font-medium text-slate-500 group-hover:text-theme">
            Add Slide
          </span>
        </button>
      </div>
    </div>
  );
}

export default Slider;
