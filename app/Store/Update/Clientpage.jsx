"use client";
import React, { useState } from "react";
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

const initialState = {
  storename: "Dahiya Collections",
  contact: {
    phone: "1234567890",
    whatsapp: "1234567890",
    location: "Hayatpur",
  },
  color: {
    theme: "#06d6a0",
    secondary: "#118ab2",
    text: "#073b4c",
  },
  social: {
    Facebook: "faceboooklink",
    Instagram: "instalink",
    YouTube: "yt link",
  },
  collections: [
    {
      name: "Gender",
      image: [],
      subcat: [
        {
          name: "Men",
          image: [],
        },
        {
          name: "Women",
          image: [],
        },
        {
          name: "Kids",
          image: [],
        },
      ],
    },
    {
      name: "Sizes",
      image: [],
      subcat: [
        {
          name: "size 1 (35)",
          image: [],
        },
        {
          name: "size 2 (36)",
          image: [],
        },
        {
          name: "size 3 (37)",
          image: [],
        },
        {
          name: "size 4 (38)",
          image: [],
        },
        {
          name: "size 5 (39)",
          image: [],
        },
        {
          name: "size 6 (40)",
          image: [],
        },
        {
          name: "size 7 (41)",
          image: [],
        },
        {
          name: "size 8 (42)",
          image: [],
        },
        {
          name: "size 9 (43)",
          image: [],
        },
        {
          name: "size 10 (44)",
          image: [],
        },
        {
          name: "size 11 (45)",
          image: [],
        },
        {
          name: "size 12 (46)",
          image: [],
        },
      ],
    },
    {
      name: "Types",
      image: [],
      subcat: [
        {
          name: "Sneakers",
          image: [],
        },
        {
          name: "Running Shoes",
          image: [],
        },
        {
          name: "Casual Shoes",
          image: [],
        },
        {
          name: "Formal Shoes",
          image: [],
        },
        {
          name: "Loafers",
          image: [],
        },
        {
          name: "Boots",
          image: [],
        },
        {
          name: "Sandals",
          image: [],
        },
        {
          name: "Slippers",
          image: [],
        },
        {
          name: "Flip-Flops",
          image: [],
        },
        {
          name: "Heels",
          image: [],
        },
        {
          name: "Sports Shoes",
          image: [],
        },
        {
          name: "Ethnic Footwear",
          image: [],
        },
      ],
    },
  ],
  storetype: "furniture",
};
function Clientpage({ storedata }) {
  const router = useRouter();

  const { setmessagefn } = AppContextfn();
  const [data, setdata] = useState(
    storedata ? { ...storedata, ...initialState } : initialState
  );

  console.log(data);

  const [deletedimages, setdeletedimages] = useState([]);
  const [newadded, setnewadded] = useState([]);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    console.log(data);
    
    try {
      const res = await saveStore(data, deletedimages);
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
            await Deleteimages(newadded);
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
        className="px-1 py-6 md:p-6 bg-white space-y-6"
      >
        <h2 className="text-2xl text-center font-semibold text-gray-800">
          {data?._id ? "Update" : "Add New Product"}
        </h2>
        {/* store Name */}
        <Group>
          <Standardinputfield
            titlename="Store Name"
            value={data?.storename}
            onchange={(e) =>
              setdata((pre) => ({ ...pre, storename: e.target.value }))
            }
            clear={() => setdata((pre) => ({ ...pre, storename: "" }))}
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

        <Collecions
          data={data}
          setdata={setdata}
          setdeletedimages={setdeletedimages}
          setnewadded={setnewadded}
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

        <div className="flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-5 sticky bottom-0 bg-white pb-5">
          <button
            type="submit"
            className="flex items-center justify-center gap-2  px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
                await Deleteimages(newadded);
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
                  await Deleteimages(newadded);
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

const Group = ({ children, title }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-6">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Clientpage;
