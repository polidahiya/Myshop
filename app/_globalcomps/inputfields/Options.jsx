"use client";
import React, { useState } from "react";
import Standardinputfield from "./Standardinputfield";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import Imageuploader from "./Imageuploader";

function Options({ data, setdata, setdeletedimages, setnewadded }) {
  const [showform, setshowform] = useState(false);
  const [editindex, seteditindex] = useState([0, 0]);

  const handleMoveOption = (i, j, dir) => {
    const updateddata = { ...data };
    const options = updateddata.options[i].options;
    const newIndex = j + dir;
    if (newIndex >= 0 && newIndex < options.length) {
      [options[j], options[newIndex]] = [options[newIndex], options[j]];
      setdata(updateddata);
    }
  };

  return (
    <div className="mt-4">
      <div className="space-y-2">
        {!showform &&
          data.options.map((moreoption, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-gray-200 bg-white p-4 z-0"
            >
              {/* Section Title */}
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {moreoption.name}
              </h2>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {moreoption.options.map(
                  ({ name, image, imageindex, price, mrp }, j) => (
                    <div key={j}>
                      <div
                        key={j}
                        className="relative flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3"
                      >
                        {/* Image (optional) */}
                        {image && (
                          <img
                            src={image}
                            alt={name}
                            className="h-16 w-16 rounded-lg object-cover border"
                          />
                        )}
                        {/* Always show details */}
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{name}</p>
                          <p className="text-gray-500">Index: {imageindex}</p>
                          <p className="text-green-600 font-semibold">
                            ₹{price}
                          </p>
                          <p className="text-red-500 line-through text-xs">
                            ₹{mrp}
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
                          className="flex-1 aspect-square text-sm border rounded-md flex items-center justify-center"
                          onClick={() => {
                            setshowform(true);
                            seteditindex([i, j]);
                          }}
                          type="button"
                        >
                          <MdOutlineEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const images = data.options[i].options[j].image;
                            setdeletedimages((pre) => [...pre, ...images]);

                            const updateddata = { ...data };
                            updateddata.options[i].options.splice(j, 1);
                            setdata(updateddata);
                          }}
                          className="flex-1 aspect-square text-sm border rounded-md"
                        >
                          <MdDeleteOutline className="inline-block" />
                        </button>
                      </div>
                    </div>
                  )
                )}
                {/* add new button */}
                <button
                  className="rounded-xl border border-gray-100 bg-gray-50 min-h-10"
                  onClick={() => {
                    const updateddata = { ...data };
                    updateddata.options[i].options.push({
                      name: "",
                      image: "",
                      imageindex: 0,
                      price: "",
                      mrp: "",
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
                  data.options[i].options.forEach((option) => {
                    if (option.image.length > 0) {
                      dimages.push(...option.image);
                    }
                  });
                  setdeletedimages((pre) => [...pre, ...dimages]);
                  //
                  const updateddata = { ...data };
                  updateddata.options.splice(i, 1);
                  setdata(updateddata);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        <button
          className="px-5 py-2 rounded-md bg-green-500 text-white"
          onClick={() => {
            const updatedata = { ...data };
            updatedata.options.push({
              name: "Option Name",
              options: [
                { name: "", image: "", imageindex: 0, price: "", mrp: "" },
              ],
            });
            setdata(updatedata);
          }}
          type="button"
        >
          Add a Option
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
  const option = data?.options[editindex[0]]?.options[editindex[1]];

  // helper to update deep values safely
  const updateOptionField = (field, value) => {
    setdata((prev) => {
      const updated = { ...prev };
      updated.options[editindex[0]].options[editindex[1]][field] = value;
      return updated;
    });
  };

  const updateOptionName = (value) => {
    setdata((prev) => {
      const updated = { ...prev };
      updated.options[editindex[0]].name = value;
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
            value={data?.options[editindex[0]]?.name}
            onchange={(e) => updateOptionName(e.target.value)}
            clear={() => updateOptionName("")}
          />
          <hr />
          <div className="flex justify-center">
            <div className="w-52 h-52">
              <Imageuploader
                img={option?.image}
                callback={(imageurl) =>
                  setdata((pre) => {
                    const updateddata = { ...pre };
                    updateddata.options[editindex[0]].options[
                      editindex[1]
                    ].image = imageurl;
                    return updateddata;
                  })
                }
                remove={() =>
                  setdata((pre) => {
                    const updateddata = { ...pre };
                    updateddata.options[editindex[0]].options[
                      editindex[1]
                    ].image = "";
                    return updateddata;
                  })
                }
                size={0.2}
                dimension={200}
                folder="Mystore"
                setdeletedimages={setdeletedimages}
                setnewadded={setnewadded}
                cover={false}
              />
            </div>
          </div>

          <Standardinputfield
            titlename="Option Value"
            value={option?.name || ""}
            onchange={(e) => updateOptionField("name", e.target.value)}
            clear={() => updateOptionField("name", "")}
          />

          <Standardinputfield
            titlename="Image Index"
            type="number"
            value={option?.imageindex || ""}
            onchange={(e) => updateOptionField("imageindex", e.target.value)}
            clear={() => updateOptionField("imageindex", "")}
          />

          <Standardinputfield
            titlename="Change in Price"
            type="number"
            value={option?.price || ""}
            onchange={(e) => updateOptionField("price", e.target.value)}
            clear={() => updateOptionField("price", "")}
          />

          <Standardinputfield
            titlename="Change in MRP"
            type="number"
            value={option?.mrp || ""}
            onchange={(e) => updateOptionField("mrp", e.target.value)}
            clear={() => updateOptionField("mrp", "")}
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

export default Options;
