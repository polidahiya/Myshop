"use client";
import React, { useState } from "react";
import { socialPlatforms } from "@/lib/data";

// Social media data

export default function SocialLinksManager({ state, setstate }) {
  const socials = state?.social;
  const [selected, setselected] = useState("Facebook");
  const [url, setUrl] = useState("");

  const handleAddOrUpdate = () => {
    if (!url) return;

    setstate((pre) => ({
      ...pre,
      social: { ...pre.social, [selected]: url },
    }));
    setUrl("");
  };

  const handleEdit = (key) => {
    setselected(key);
    setUrl(socials[key]);
  };

  const handleDelete = (key) => {
    const updated = { ...socials };
    delete updated[key];
    setstate((pre) => ({
      ...pre,
      social: updated,
    }));
  };

  return (
    <>
      {/* Form */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <select
          value={selected}
          onChange={(e) => setselected(e.target.value)}
          className="border rounded-lg p-2 flex-1"
        >
          {Object.keys(socialPlatforms).map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>

        <input
          type="url"
          placeholder="Enter profile link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border rounded-lg p-2 flex-1"
        />

        <button
          type="button"
          onClick={handleAddOrUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* List */}
      <ul className="space-y-3">
        {socials &&
          Object.entries(socials).map(([key, link], i) => {
            const platformData = socialPlatforms[key];
            return (
              <li
                key={i}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span
                    style={{ color: platformData?.color }}
                    className="text-2xl"
                  >
                    {platformData?.icon}
                  </span>
                  <span className="font-medium">{key}</span>
                </a>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(key)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(key)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}
