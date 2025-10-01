"use client";
import React, { useState, useEffect } from "react";

export default function Searchbar({
  onFocus = () => {},
  onBlur = () => {},
  Api = async () => {},
  getQuery = () => {},
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 3) {
        setLoading(true);
        await Api(query);
        getQuery(query);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="w-full max-w-2xl">
      <label className="relative block">
        <input
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Type to search..."
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 shadow-sm outline-none"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {loading ? (
            <div
              className="w-6 h-6 animate-spin border-2 border-gray-300 rounded-full border-t-gray-600"
              aria-hidden="true"
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setQuery("");
              }}
              className="p-1 rounded-md hover:bg-slate-100"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </label>
    </div>
  );
}
