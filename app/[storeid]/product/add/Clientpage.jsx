"use client";
import React, { useState } from "react";
import Standardinputfield from "@/app/_globalcomps/inputfields/Standardinputfield";
import Multiplevaluesfield from "@/app/_globalcomps/inputfields/Multiplevaluesfield";
import Images from "@/app/_globalcomps/inputfields/Images";
import Togglebuttons from "@/app/_globalcomps/inputfields/Togglebuttons";
import Multiselectmenu from "@/app/_globalcomps/inputfields/Multiselectmenu";
import Options from "@/app/_globalcomps/inputfields/Options";
import Link from "next/link";
import { Addproduct } from "./Serveraction";
import { Deleteimages } from "@/lib/Addordeleteimages";
import { useRouter } from "next/navigation";
import { AppContextfn } from "@/app/Context";

const initialState = {
  name: "",
  mrp: "",
  price: "",
  keyfeatures: [""],
  descriptions: [""],
  collections: [],
  stocks: 0,
  images: [],
  options: [
    // {
    //   name: "test",
    //   options: [{ name: "", image: "[], imageindex: 0, price: "", mrp: "" }],
    // },
  ],
  seotitle: "",
  seodescription: "",
  seokeywords: "",
  available: true,
  trash: false,
};

function Clientpage({ productdata, collections }) {
  const router = useRouter();

  const { setmessagefn } = AppContextfn();
  const [data, setdata] = useState(
    productdata ? { ...initialState, ...productdata } : initialState
  );

  const [deletedimages, setdeletedimages] = useState([]);
  const [newadded, setnewadded] = useState([]);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await Addproduct(data, deletedimages);
      setdata(initialState);
      setmessagefn(res?.message);
      setloading(false);
      setdeletedimages([]);
      setnewadded([]);
    } catch (error) {
      setdata(initialState);
      setloading(false);
      setmessagefn("Error!");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Link
        href={"/admin/products"}
        onClick={async (e) => {
          e.preventDefault();
          if (newadded.length > 0) {
            setmessagefn("Cleaning up...");
            await Deleteimages(newadded, "Mystore/Products");
          }
          router.push("/admin/products");
        }}
        className="fixed top-1 right-1 md:top-5 md:right-5 flex items-center justify-center w-10 aspect-square bg-slate-300 z-10"
      >
        x
      </Link>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="px-1 py-6 md:p-6 bg-white shadow-lg rounded-md space-y-6"
      >
        <h2 className="text-2xl text-center font-semibold text-gray-800">
          {data?._id ? "Update" : "Add New Product"}
        </h2>
        {/* Product Name */}
        <Standardinputfield
          titlename="Product Name"
          value={data?.name}
          onchange={(e) => setdata((pre) => ({ ...pre, name: e.target.value }))}
          clear={() => setdata((pre) => ({ ...pre, name: "" }))}
        />

        {/* mrp */}
        <Standardinputfield
          titlename="MRP"
          type="number"
          isRequired={false}
          value={data?.mrp}
          onchange={(e) => setdata((pre) => ({ ...pre, mrp: e.target.value }))}
          clear={() => setdata((pre) => ({ ...pre, mrp: "" }))}
        />
        {/* selling price */}
        <Standardinputfield
          titlename="Selling Price"
          type="number"
          value={data?.price}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, price: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, price: "" }))}
        />

        {/* Key features */}
        <Multiplevaluesfield
          state={data?.keyfeatures}
          setState={setdata}
          statename="keyfeatures"
          placeholder={"key feature"}
          title={"Key Features"}
        />
        {/* Descriptions */}
        <Multiplevaluesfield
          state={data?.descriptions}
          statename="descriptions"
          setState={setdata}
          placeholder={"Lorem ipsum"}
          title={"Descriptions"}
        />
        {/* collections */}
        <Multiselectmenu
          state={data?.collections || []}
          statename="collections"
          setState={setdata}
          title={"Collections"}
          options={collections}
        />
        {/* stocks */}
        <Standardinputfield
          titlename="Stocks"
          type="number"
          value={data?.stocks}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, stocks: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, stocks: "" }))}
        />
        {/* variants */}
        <Images
          data={data}
          setdata={setdata}
          setdeletedimages={setdeletedimages}
          setnewadded={setnewadded}
        />
        <Options
          data={data}
          setdata={setdata}
          setdeletedimages={setdeletedimages}
          setnewadded={setnewadded}
        />
        {/* seo */}
        <h2 className="my-2 font-bold text-lg">SEO</h2>
        {/* title */}
        <Standardinputfield
          titlename="Title"
          value={data?.seotitle}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, seotitle: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, seotitle: "" }))}
        />

        {/* Description */}
        <Standardinputfield
          titlename={`Description ${
            data?.seodescription
              ? 160 - data?.seodescription.length
              : "(160 characters max)"
          }`}
          isRequired={false}
          value={data?.seodescription}
          setState={setdata}
          onchange={(e) => {
            const value = e.target.value;
            if (value.length <= 160) {
              setdata((pre) => ({ ...pre, seodescription: value }));
            } else {
              setdata((pre) => ({
                ...pre,
                seodescription: value.slice(0, 160),
              }));
            }
          }}
          clear={() => setdata((pre) => ({ ...pre, seodescription: "" }))}
        />

        {/* keywords */}
        <Standardinputfield
          titlename="Keywords"
          isRequired={false}
          value={data?.seokeywords}
          onchange={(e) =>
            setdata((pre) => ({ ...pre, seokeywords: e.target.value }))
          }
          clear={() => setdata((pre) => ({ ...pre, seokeywords: "" }))}
        />

        {/* available */}
        <Togglebuttons
          titlename="Available?"
          value={data?.available}
          positive={() => setdata((prev) => ({ ...prev, available: true }))}
          negative={() => setdata((prev) => ({ ...prev, available: false }))}
          positiveText="Yes"
          negativeText="No"
        />
        {/* Trash */}
        <Togglebuttons
          titlename="Move to Trash?"
          value={data?.trash}
          positive={() => setdata((prev) => ({ ...prev, trash: true }))}
          negative={() => setdata((prev) => ({ ...prev, trash: false }))}
          positiveText="Yes"
          negativeText="No"
        />

        <div className="flex items-center justify-center gap-5 sticky bottom-5">
          <button
            type="submit"
            className="flex items-center justify-center gap-2  px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {loading && (
              <span
                className={`block h-5 aspect-square border-t-2 border-b-2 border-white rounded-full animate-spin`}
              ></span>
            )}
            {data?._id ? "Update Product" : "Add Product"}
          </button>
          <button
            className="flex items-center justify-center gap-2  px-4 py-2 bg-white  border  rounded-md"
            type="button"
            onClick={async () => {
              if (newadded.length > 0) {
                setmessagefn("Cleaning up...");
                await Deleteimages(newadded, "Mystore/Products");
              }
              setdata(initialState);
              setdeletedimages([]);
            }}
          >
            Reset
          </button>
          {data?._id && (
            <Link
              href={"/admin/products"}
              onClick={async (e) => {
                e.preventDefault();
                if (newadded.length > 0) {
                  setmessagefn("Cleaning up...");
                  await Deleteimages(newadded, "Mystore/Products");
                }
                router.push("/admin/products");
              }}
              className="flex items-center justify-center gap-2  px-4 py-2 bg-white  border  rounded-md"
            >
              Cancel Update
            </Link>
          )}
        </div>
      </form>
    </>
  );
}

export default Clientpage;
