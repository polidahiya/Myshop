"use client";
import React, { useState } from "react";
import { AppContextfn } from "@/app/Context";
import { saveStore } from "./Serveraction";

export default function Createstore() {
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
      secondary: "",
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
      const result = await saveStore(formData);

      if (result.status === 200) {
        setmessagefn("Store Created successfully!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Step {step} of 4</h2>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Store Name *"
              value={formData.storename}
              onChange={(e) => handleChange(e, null, "storename")}
              className="w-full p-2 border rounded"
            />
            <select
              value={formData.storetype}
              onChange={(e) => handleChange(e, null, "storetype")}
              className="w-full p-2 border rounded"
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
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Phone *"
              value={formData.contact.phone}
              onChange={(e) => handleChange(e, "contact", "phone")}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="WhatsApp *"
              value={formData.contact.whatsapp}
              onChange={(e) => handleChange(e, "contact", "whatsapp")}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Location *"
              value={formData.contact.location}
              onChange={(e) => handleChange(e, "contact", "location")}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <label>Theme:</label>
              <input
                type="color"
                value={formData.color.theme}
                onChange={(e) => handleChange(e, "color", "theme")}
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Secondary:</label>
              <input
                type="color"
                value={formData.color.secondary}
                onChange={(e) => handleChange(e, "color", "secondary")}
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Text:</label>
              <input
                type="color"
                value={formData.color.text}
                onChange={(e) => handleChange(e, "color", "text")}
              />
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Facebook"
              value={formData.social.facebook}
              onChange={(e) => handleChange(e, "social", "facebook")}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Instagram"
              value={formData.social.instagram}
              onChange={(e) => handleChange(e, "social", "instagram")}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Twitter"
              value={formData.social.twitter}
              onChange={(e) => handleChange(e, "social", "twitter")}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
