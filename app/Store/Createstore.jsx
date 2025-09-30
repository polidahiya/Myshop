"use client";
import React, { useState } from "react";
import { AppContextfn } from "@/app/Context";
import { saveStore } from "./Serveraction";
import { useRouter } from "next/navigation";

export default function Createstore() {
  const router = useRouter();
  const { setmessagefn } = AppContextfn();

  const [formData, setFormData] = useState({
    storename: "",
    storetype: "",
    Pincode: "",
    contact: {
      phone: "",
      whatsapp: "",
      location: "",
    },
    color: {
      theme: "#ffac1b",
      secondary: "#0091ff",
      text: "#525252",
    },
    social: {},
  });

  const handleChange = (e, section, field) => {
    if (section) {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: e.target.value },
      });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const validateForm = () => {
    if (!formData.storename || !formData.storetype) {
      setmessagefn("Please fill store name and store type.");
      return false;
    }
    if (
      !formData.contact.phone ||
      !formData.contact.whatsapp ||
      !formData.contact.location ||
      !formData.Pincode
    ) {
      setmessagefn("Please complete all contact details.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const res = await saveStore(formData);
      setmessagefn(res.message);
      if (res.status === 200) {
        router.replace(`/${res?.storeid}`);
      }
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen px-4 z-10">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg"
      >
        {/* Back button */}
        <button
          type="button"
          className="absolute top-4 right-4 rounded-full w-10 aspect-square bg-gray-100"
          onClick={() => router.back()}
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Create Store
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Store Name *"
            value={formData.storename}
            onChange={(e) => handleChange(e, null, "storename")}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
          />
          <select
            value={formData.storetype}
            onChange={(e) => handleChange(e, null, "storetype")}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
          >
            <option value="">Select Store Type *</option>
            <option value="furniture">Furniture</option>
            <option value="electronics">Electronics</option>
            <option value="Laptops">Laptops</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Clothes">Clothes</option>
            <option value="Food">Food</option>
            <option value="Glasses">Glasses</option>
            <option value="Others">Others</option>
          </select>
          <input
            type="text"
            placeholder="Phone *"
            value={formData.contact.phone}
            onChange={(e) => handleChange(e, "contact", "phone")}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
          />
          <input
            type="text"
            placeholder="WhatsApp *"
            value={formData.contact.whatsapp}
            onChange={(e) => handleChange(e, "contact", "whatsapp")}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
          />
          <input
            type="text"
            placeholder="Location *"
            value={formData.contact.location}
            onChange={(e) => handleChange(e, "contact", "location")}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
          />
          <input
            type="number"
            placeholder="Pincode *"
            value={formData.Pincode}
            onChange={(e) => handleChange(e, null, "Pincode")}
            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
          />
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
