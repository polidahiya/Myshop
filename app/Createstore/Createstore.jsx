"use client";
import React, { useState } from "react";
import { AppContextfn } from "@/app/Context";
import { saveStore } from "./Serveraction";
import { useRouter } from "next/navigation";

export default function Createstore() {
  const router = useRouter();
  const { setmessagefn } = AppContextfn();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    storename: "",
    storetype: "",
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
    social: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
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

  const validateStep = () => {
    if (step === 1) {
      if (!formData.storename || !formData.storetype) {
        setmessagefn("Please fill all fields in this step.");
        return false;
      }
    }
    if (step === 2) {
      if (
        !formData.contact.phone ||
        !formData.contact.whatsapp ||
        !formData.contact.location
      ) {
        setmessagefn("Please complete all contact details.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep()) {
      const res = await saveStore(formData);
      setmessagefn(res.message);
      if (res.status === 200) {
        router.replace(`/${res?.storeid}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Step {step} of 4
        </h2>

        {/* Step 1 */}
        {step === 1 && (
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
              <option value="fashion">Fashion</option>
            </select>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
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
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-gray-600 font-medium">Theme:</label>
              <input
                type="color"
                value={formData.color.theme}
                onChange={(e) => handleChange(e, "color", "theme")}
                className="w-12 h-12 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-600 font-medium">Secondary:</label>
              <input
                type="color"
                value={formData.color.secondary}
                onChange={(e) => handleChange(e, "color", "secondary")}
                className="w-12 h-12 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-600 font-medium">Text:</label>
              <input
                type="color"
                value={formData.color.text}
                onChange={(e) => handleChange(e, "color", "text")}
                className="w-12 h-12 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Facebook"
              value={formData.social.facebook}
              onChange={(e) => handleChange(e, "social", "facebook")}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            />
            <input
              type="text"
              placeholder="Instagram"
              value={formData.social.instagram}
              onChange={(e) => handleChange(e, "social", "instagram")}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            />
            <input
              type="text"
              placeholder="Twitter"
              value={formData.social.twitter}
              onChange={(e) => handleChange(e, "social", "twitter")}
              className="w-full p-3 border border-gray-300 rounded-lg outline-none"
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition cursor-pointer"
            >
              Back
            </button>
          )}
          {step == 4 && (
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition cursor-pointer"
            >
              Submit
            </button>
          )}
          {step < 4 && (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition cursor-pointer"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
