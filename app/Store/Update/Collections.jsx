"use client";
import React, { useState } from "react";
import Standardinputfield from "@/app/_globalcomps/inputfields/Standardinputfield";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { LuCloudUpload } from "react-icons/lu";
import { AppContextfn } from "@/app/Context";
// import { Addimages } from "@/app/[storeid]/addproduct/Serveraction";
import Imageuploader from "@/app/_globalcomps/inputfields/Imageuploader";

export default function Collecions({
  data,
  setdata,
  setdeletedimages,
  setnewadded,
}) {
  const [showform, setshowform] = useState(false);
  const [editindex, seteditindex] = useState([0, 0]);

  const handleMoveOption = (i, j, dir) => {
    const updateddata = { ...data };
    const subcats = updateddata.collections[i].subcat;
    const newIndex = j + dir;
    if (newIndex >= 0 && newIndex < subcats.length) {
      [subcats[j], subcats[newIndex]] = [subcats[newIndex], subcats[j]];
      setdata(updateddata);
    }
  };

  return (
    <div className="mt-4">
      <div className="space-y-2">
        {!showform &&
          data.collections.map((category, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-gray-200 bg-white p-4 z-0"
            >
              {/* Section Title */}
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {category?.name}
              </h2>

              {/* Options Grid */}
              <div className="flex overflow-x-scroll gap-4">
                {category.subcat.map((subcat, j) => (
                  <div key={j}>
                    <div className="relative w-60 shrink-0 flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
                      {/* Image (optional) */}
                      {subcat?.image && (
                        <img
                          src={subcat?.image}
                          alt={subcat?.name}
                          className="h-16 w-16 rounded-lg object-cover border"
                        />
                      )}
                      {/* Always show details */}
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">
                          {subcat?.name}
                        </p>
                      </div>
                    </div>
                    {/* Edit Button */}
                    <div className="flex h-8 gap-1 w-full mt-1">
                      <button
                        type="button"
                        onClick={() => handleMoveOption(i, j, -1)}
                        className="flex-1 aspect-square text-sm border rounded-md"
                      >
                        <BsArrowLeftShort className="inline-block" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveOption(i, j, 1)}
                        className="flex-1 aspect-square text-sm border rounded-md"
                      >
                        <BsArrowLeftShort className="inline-block rotate-180" />
                      </button>
                      {/* Replace Image Button */}
                      <button
                        className="flex-1 aspect-square text-sm border rounded-md"
                        onClick={() => {
                          setshowform(true);
                          seteditindex([i, j]);
                        }}
                        type="button"
                      >
                        ↺
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const images = data.collections[i].subcat[j].image;
                          setdeletedimages((pre) => [...pre, ...images]);

                          const updateddata = { ...data };
                          updateddata.collections[i].subcat.splice(j, 1);
                          setdata(updateddata);
                        }}
                        className="flex-1 aspect-square text-sm border rounded-md"
                      >
                        <MdDeleteOutline className="inline-block" />
                      </button>
                    </div>
                  </div>
                ))}
                {/* add new subcat */}
                <button
                  className="w-60 shrink-0 rounded-xl border border-gray-100 bg-gray-50 min-h-10"
                  onClick={() => {
                    const updateddata = { ...data };
                    updateddata.collections[i].subcat.push({
                      name: "Option",
                      image: "",
                    });
                    setdata(updateddata);
                  }}
                  type="button"
                >
                  Add new
                </button>
              </div>
              {/* delete button */}
              <button
                className="absolute top-2 right-2 rounded-full bg-gray-100 hover:bg-gray-200 w-9 h-9 flex items-center justify-center"
                type="button"
                onClick={() => {
                  const dimages = [];
                  dimages.push(...data.collections[i].image);
                  data.collections[i].subcat.forEach((option) => {
                    if (option.image.length > 0) {
                      dimages.push(...option.image);
                    }
                  });
                  setdeletedimages((pre) => [...pre, ...dimages]);
                  //
                  const updateddata = { ...data };
                  updateddata.collections.splice(i, 1);
                  setdata(updateddata);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        {/* add a category */}
        <button
          className="px-5 py-2 rounded-md bg-green-500 text-white"
          onClick={() => {
            const updatedata = { ...data };
            updatedata.collections.push({
              name: "Collection1",
              image: "",
              subcat: [
                {
                  name: "Option1",
                  image: "",
                },
              ],
            });
            setdata(updatedata);
          }}
          type="button"
        >
          Add a Category
        </button>
      </div>
      {showform && (
        <Optionform
          setshowform={setshowform}
          editindex={editindex}
          data={data}
          setdata={setdata}
          setdeletedimages={setdeletedimages}
          setnewadded={setnewadded}
        />
      )}
    </div>
  );
}

const Optionform = ({
  setshowform,
  editindex,
  data,
  setdata,
  setdeletedimages,
  setnewadded,
}) => {
  const option = data?.collections[editindex[0]]?.subcat[editindex[1]];

  // helper to update deep values safely
  const updateOptionField = (field, value) => {
    setdata((prev) => {
      const updated = { ...prev };
      updated.collections[editindex[0]].subcat[editindex[1]][field] = value;
      return updated;
    });
  };

  const updateOptionName = (value) => {
    setdata((prev) => {
      const updated = { ...prev };
      updated.collections[editindex[0]].name = value;
      return updated;
    });
  };

  return (
    <div className="fixed top-0 left-0 inset-0 z-30 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Option</h2>
          <button
            className="rounded-full bg-gray-100 hover:bg-gray-200 w-9 h-9 flex items-center justify-center"
            type="button"
            onClick={() => setshowform(false)}
          >
            ✕
          </button>
        </div>
        {/* Form */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Standardinputfield
            titlename="Option Group Name"
            value={data?.collections[editindex[0]]?.name}
            onchange={(e) => updateOptionName(e.target.value)}
            clear={() => updateOptionName("")}
          />
          <hr />
          <div className="flex justify-center">
            <div className="w-52 h-52">
              <Imageuploader
                img={option?.image}
                callback={(img) =>
                  setdata((pre) => {
                    const updated = { ...pre };
                    updated.collections[editindex[0]].subcat[
                      editindex[1]
                    ].image = img;
                    return updated;
                  })
                }
                size={0.2}
                dimension={200}
                folder="Mystore/others"
                setdeletedimages={setdeletedimages}
                setnewadded={setnewadded}
                cover={false}
              />
            </div>
          </div>

          <Standardinputfield
            titlename="Subcategory Name"
            value={option?.name || ""}
            onchange={(e) => updateOptionField("name", e.target.value)}
            clear={() => updateOptionField("name", "")}
          />
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setshowform(false)}
            className="px-4 py-2 rounded-lg bg-theme hover:bg-theme text-white shadow"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
