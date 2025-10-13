"use client";
import React from "react";
import Imageuploader from "@/app/_globalcomps/inputfields/Imageuploader";
import Standardinputfield from "@/app/_globalcomps/inputfields/Standardinputfield";
import Linkselector from "@/app/_globalcomps/inputfields/Linkselector";
import Togglebuttons from "@/app/_globalcomps/inputfields/Togglebuttons";
import { Edithomectxfn } from "../../Edithomecontext";

const bannerAspectRatios = [
  "16/9",
  "18/9",
  "21/9",
  "2/1",
  "3/1",
  "4/1",
  "5/1",
  "6/1",
  "10/3",
  "5/2",
  "7/3",
  "8/3",
  "4/3",
  "5/4",
  "1/1",
  "9/16",
  "3/4",
  "2/3",
];

export default function Banner({ collections, products }) {
  const { data, setdata, setdeletedimages, setnewadded } = Edithomectxfn();

  const [width, height] = data?.props?.items[0]?.aspectratio.split("/");

  return (
    <div className="mt-5 p-4 border rounded-md">
      <div className="">
        {data?.props?.items.map((item, i) => (
          <div key={i} className="flex gap-2 flex-col">
            <div
              className="w-full"
              style={{
                height: `${(height / width) * 100}%`,
                aspectRatio: data?.props?.items[0]?.aspectratio,
              }}
            >
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
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Aspect Ratio
              </label>
              <div className="flex gap-2 w-full overflow-x-scroll mt-1">
                {bannerAspectRatios.map((item, j) => (
                  <div
                    key={j}
                    onClick={() => {
                      const updated = { ...data.props };
                      updated.items[i].aspectratio = item;
                      setdata((pre) => ({ ...pre, props: updated }));
                    }}
                    className={`h-14 border border-dashed cursor-pointer flex items-center justify-center ${
                      item === data?.props?.items[i]?.aspectratio
                        ? "bg-theme text-white"
                        : ""
                    }`}
                    style={{
                      aspectRatio: item,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

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
          </div>
        ))}
      </div>
    </div>
  );
}
