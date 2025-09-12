import React from "react";

export default function About1({ heading, para }) {
  return (
    <section className="relative py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          {heading}
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto lg:mx-0">
          {para}
        </p>
      </div>
    </section>
  );
}
