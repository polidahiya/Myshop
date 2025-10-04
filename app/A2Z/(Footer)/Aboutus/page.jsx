import React from "react";
import Link from "next/link";
export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-theme to-purple-600 text-white py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold">About A2Z</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            A2Z is the platform where anyone can create their own store, list
            products, and grow their business online — all in one place.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold">Our Mission</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          At A2Z, our mission is to empower entrepreneurs, creators, and small
          businesses by providing them with an easy-to-use platform to launch
          and manage their online stores. We believe everyone deserves a space
          to showcase their products and reach customers worldwide — without the
          need for complicated tools or heavy costs.
        </p>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Why Choose A2Z?</h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {[
              {
                title: "Create Your Store",
                desc: "Set up your own personalized store in minutes with no coding required.",
                icon: "🏪",
              },
              {
                title: "List Products Easily",
                desc: "Upload and manage your products with a simple and intuitive dashboard.",
                icon: "📦",
              },
              {
                title: "Grow Your Business",
                desc: "Reach more customers and scale your business with built-in tools.",
                icon: "🚀",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition"
              >
                <div className="text-5xl">{feature.icon}</div>
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-theme text-white py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Your Store with A2Z Today
        </h2>
        <p className="mt-4 text-gray-200">
          Join thousands of creators and entrepreneurs who are already selling
          on A2Z.
        </p>
        <div className="flex justify-center">
          <Link
            href={"/Store"}
            className="block mt-6 px-8 py-3 bg-white text-theme font-semibold rounded-xl shadow-md hover:bg-gray-100 transition mx-auto"
          >
            Create Your Store
          </Link>
        </div>
      </section>
    </div>
  );
}
