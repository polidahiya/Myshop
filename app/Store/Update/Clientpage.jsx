"use client";
import React, { useRef, useState } from "react";
import Standardinputfield from "@/app/_globalcomps/inputfields/Standardinputfield";
import Togglebuttons from "@/app/_globalcomps/inputfields/Togglebuttons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppContextfn } from "@/app/Context";
import SocialLinks from "../_comps/Socialselect";
import ColorSelector from "@/app/_globalcomps/inputfields/Colorselector";
import Collecions from "./Collections";
import { saveStore } from "../Serveraction";
import { Deleteimages } from "@/lib/Addordeleteimages";
import { FaEdit, FaFolderOpen } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import Imageuploader from "@/app/_globalcomps/inputfields/Imageuploader";

const initialState = {
  storename: "",
  Pincode: "",
  logo: "",
  contact: {
    phone: "",
    whatsapp: "",
    location: "",
  },
  color: {
    theme: "#06d6a0",
    secondary: "#118ab2",
    text: "#073b4c",
  },
  social: {},
  collections: [
    {
      name: "Category",
      image: "",
      subcat: [
        {
          name: "Subcategory",
          image: "",
        },
      ],
    },
  ],
  storetype: "furniture",
};
function Clientpage({ storedata, storeid }) {
  const router = useRouter();
  const { setmessagefn, newadded, setnewadded } = AppContextfn();

  const mergedstate = storedata
    ? { ...initialState, ...storedata }
    : initialState;
  const initialstateref = useRef(JSON.parse(JSON.stringify(mergedstate)));

  const [data, setdata] = useState(mergedstate);
  const [formtype, setformtype] = useState(0);

  const [deletedimages, setdeletedimages] = useState([]);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const res = await saveStore(data, deletedimages);
      setdata(initialState);
      setmessagefn(res?.message);
      setloading(false);
      setdeletedimages([]);
      setnewadded([]);
      if (res.status == 200) {
        router.push(`/${storeid}`);
      }
    } catch (error) {
      setdata(initialState);
      setloading(false);
      setmessagefn("Error!");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button
        onClick={async (e) => {
          if (newadded.length > 0) {
            setmessagefn("Cleaning up...");
            await Deleteimages(newadded, "Mystore");
          }
          window.history.back();
        }}
        className="fixed top-1 right-1 md:top-5 md:right-5 flex items-center justify-center w-10 aspect-square bg-slate-300 z-10"
      >
        X
      </button>
      {/* Navigations */}
      {formtype == 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 px-4 py-20">
          {/* Tile 1 */}
          <button
            className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl text-white shadow-md bg-gradient-to-r from-theme to-theme cursor-pointer"
            onClick={() => setformtype(1)}
          >
            <FaEdit size={32} />
            <span className="text-lg font-semibold">Update Basic Details</span>
          </button>

          {/* Tile 2 */}
          <button
            className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl text-white shadow-md bg-gradient-to-r from-green-400 to-emerald-600 cursor-pointer"
            onClick={() => setformtype(2)}
          >
            <FaFolderOpen size={32} />
            <span className="text-lg font-semibold">Update Collections</span>
          </button>
        </div>
      )}
      {/* form */}
      <form
        onSubmit={handleSubmit}
        method="post"
        className="px-1 py-6 md:p-6 bg-white space-y-6"
      >
        {/* heading */}
        {formtype != 0 && (
          <div className="flex">
            <div className="flex-1">
              <button
                className="flex items-center gap-2 px-5 py-2 cursor-pointer"
                onClick={() => setformtype(0)}
              >
                <IoArrowBack /> Back
              </button>
            </div>
            <h2 className="flex-1 text-2xl text-center font-semibold text-gray-800">
              {data?._id ? "Update" : "Add New Product"}
            </h2>
            <div className="flex-1"></div>
          </div>
        )}
        {formtype == 1 && (
          <>
            <Group>
              <div className="w-44 aspect-square mx-auto text-gray-500 ">
                <Imageuploader
                  img={data?.logo}
                  callback={(img) => {
                    setdata((pre) => ({ ...pre, logo: img }));
                  }}
                  cover={false}
                  size={0.2}
                  dimension={100}
                  folder={"Mystore"}
                  setdeletedimages={setdeletedimages}
                  setnewadded={setnewadded}
                />
              </div>
              {/* store Name */}
              <Standardinputfield
                titlename="Store Name"
                value={data?.storename}
                onchange={(e) =>
                  setdata((pre) => ({ ...pre, storename: e.target.value }))
                }
                clear={() => setdata((pre) => ({ ...pre, storename: "" }))}
              />
              <Standardinputfield
                titlename="Pincode"
                value={data?.Pincode}
                type="number"
                onchange={(e) =>
                  setdata((pre) => ({ ...pre, Pincode: e.target.value }))
                }
                clear={() => setdata((pre) => ({ ...pre, Pincode: "" }))}
              />
            </Group>
            <Group title={"Contact Details"}>
              {/* Phone number*/}
              <Standardinputfield
                titlename="Phone Number"
                type="number"
                value={data?.contact?.phone}
                onchange={(e) =>
                  setdata((pre) => ({
                    ...pre,
                    contact: { ...pre.contact, phone: e.target.value },
                  }))
                }
                clear={() =>
                  setdata((pre) => ({
                    ...pre,
                    contact: { ...pre.contact, phone: "" },
                  }))
                }
              />
              {/* whatsapp number*/}
              <Standardinputfield
                titlename="WhatsApp Number"
                type="number"
                value={data?.contact?.whatsapp}
                onchange={(e) =>
                  setdata((pre) => ({
                    ...pre,
                    contact: { ...pre.contact, whatsapp: e.target.value },
                  }))
                }
                clear={() =>
                  setdata((pre) => ({
                    ...pre,
                    contact: { ...pre.contact, whatsapp: "" },
                  }))
                }
              />
              {/* Location*/}
              <Standardinputfield
                titlename="Location"
                type="text"
                value={data?.contact?.location}
                onchange={(e) =>
                  setdata((pre) => ({
                    ...pre,
                    contact: { ...pre.contact, location: e.target.value },
                  }))
                }
                clear={() =>
                  setdata((pre) => ({
                    ...pre,
                    contact: { ...pre.contact, location: "" },
                  }))
                }
              />
            </Group>
            <Group title={"Manage Social Links"}>
              <SocialLinks state={data} setstate={setdata} />
            </Group>
            <Group title={"🎨 Choose Store Colors"}>
              <ColorSelector state={data} setstate={setdata} />
            </Group>
            <Group title={"More"}>
              {/* available */}
              <Togglebuttons
                titlename="Available?"
                value={data?.available}
                positive={() =>
                  setdata((prev) => ({ ...prev, available: true }))
                }
                negative={() =>
                  setdata((prev) => ({ ...prev, available: false }))
                }
                positiveText="Yes"
                negativeText="No"
              />
            </Group>
          </>
        )}
        {formtype == 2 && (
          <Collecions
            data={data}
            setdata={setdata}
            setdeletedimages={setdeletedimages}
            setnewadded={setnewadded}
          />
        )}
        {formtype != 0 && (
          <div className="flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-5 sticky bottom-0 bg-white pb-5">
            <button
              type="submit"
              className="flex items-center justify-center gap-2  px-4 py-2 bg-theme text-white rounded-md hover:bg-theme"
            >
              {loading && (
                <span
                  className={`block h-5 aspect-square border-t-2 border-b-2 border-white rounded-full animate-spin`}
                ></span>
              )}
              {data?._id ? "Update Store" : "Create Store"}
            </button>
            <button
              className="flex items-center justify-center gap-2  px-4 py-2 bg-white  border  rounded-md"
              type="button"
              onClick={async () => {
                if (newadded.length > 0) {
                  setmessagefn("Cleaning up...");
                  await Deleteimages(newadded, "Mystore");
                }
                setdata(initialstateref.current);
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
                    await Deleteimages(newadded, "Mystore");
                  }
                  router.push("/admin/products");
                }}
                className="flex items-center justify-center gap-2  px-4 py-2 bg-white  border  rounded-md"
              >
                Cancel Update
              </Link>
            )}
          </div>
        )}
      </form>
    </>
  );
}

const Group = ({ children, title }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-6">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Clientpage;
