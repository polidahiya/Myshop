import React from "react";
import Link from "next/link";
import Nextimage from "../_globalcomps/Nextimage";
import { IoSearchOutline } from "react-icons/io5";

export default function HomePage() {
  return (
    <main className="pt-14">
      <section className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          src="/homepage/herobackground.png"
          alt=""
          className="absolute left-0 top-0 w-full h-full object-cover md:object-fill brightness-110 blur-3xl"
        />
        <div className="relative flex flex-col md:pl-20 px-5 z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight font-tenor">
            Launch your online store in minutes
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-[500px]">
            Beautiful storefronts, secure checkout, and everything you need to
            sell online — simple pricing and zero setup hassles.
          </p>

          <div className="mt-8 flex gap-1">
            <Link
              href="/Store"
              className="w-full md:w-fit px-2 md:px-6 py-3 rounded-md bg-theme text-white font-medium flex items-center justify-center gap-3"
            >
              <span>+</span> Create your Store
            </Link>
            <Link
              href="/Search"
              className="w-full md:w-fit px-2 md:px-6 py-3 rounded-md bg-theme text-white font-medium flex items-center justify-center gap-3"
            >
              <IoSearchOutline />
              Search a Store
            </Link>
          </div>

          <div className="flex items-center gap-0 md:gap-6 text-sm text-gray-500 mt-10 md:mt-20 text-center">
            <div className="flex flex-col md:flex-row items-center lg:bg-white px-5 py-2 rounded-full ">
              <span>💎</span> <p>Premium Components</p>
            </div>
            <div className="flex flex-col md:flex-row items-center lg:bg-white px-5 py-2 rounded-full ">
              <span>⚡</span> <p>Quick setup</p>
            </div>
            <div className="flex flex-col md:flex-row items-center lg:bg-white px-5 py-2 rounded-full ">
              <span>✅</span> <p>Easy to use</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <Nextimage
            src="/homepage/homeresponsiveimage.png"
            alt="Responsive image"
            height={500}
            width={500}
            className="w-full object-cover my-7"
          />
        </div>
      </section>
      <div className="px-6">
        {/* Features */}
        <section id="features" className="mt-16">
          <h3 className="text-2xl font-semibold">
            Everything you need to sell online
          </h3>
          <p className="text-gray-600 mt-2">
            A curated set of tools to build, run and scale your online business.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Storefronts",
                desc: "Beautiful, responsive themes you can customize",
                icon: "🏬",
              },
              {
                title: "Payments",
                desc: "Integrated payment gateways & instant settlements",
                icon: "💳",
              },
              {
                title: "Orders",
                desc: "Manage orders, returns & inventory in one place",
                icon: "📦",
              },
              {
                title: "Analytics",
                desc: "Insights to grow your business",
                icon: "📊",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="text-3xl">{f.icon}</div>
                <h4 className="mt-3 font-semibold">{f.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Templates */}
        <section id="templates" className="mt-16">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Store templates</h3>
              <p className="text-gray-600 mt-1">
                Pick a template and go live in minutes.
              </p>
            </div>
            <button className="hidden sm:inline-block px-4 py-2 rounded-md border">
              View all
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                img: "https://i.pinimg.com/736x/17/2d/28/172d28eb00b4ceecde0aa60898e43684.jpg",
                Link: "/A2Z",
                title: "Modern Store",
                desc: "Perfect for business.",
              },
              {
                img: "https://images-platform.99static.com//RZNfVXNWLTaxvDxF1JOY0UB5z9M=/0x0:2040x2035/fit-in/500x500/99designs-contests-attachments/113/113450/attachment_113450660",
                Link: "/A2Z",
                title: "Modern Store",
                desc: "Perfect for food shop.",
              },
              {
                img: "https://i.pinimg.com/236x/db/34/6f/db346f739762cfee75d1a36e0ff9a20a.jpg",
                Link: "/A2Z",
                title: "Modern Store",
                desc: "Perfect for fashion.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4">
                <div className="bg-gray-100 rounded-md flex items-center justify-center text-gray-400 overflow-hidden">
                  <img
                    src={item?.img}
                    alt=""
                    className="object-cover object-top w-full h-full aspect-square"
                  />
                </div>
                <h4 className="mt-3 font-semibold">Modern store</h4>
                <p className="text-sm text-gray-600 mt-1">{item?.desc}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Link
                    href={"/A2Z"}
                    className="block w-full px-3 py-2 rounded-md bg-theme text-white text-sm text-center"
                  >
                    Use template
                  </Link>
                  <Link
                    href={"/A2Z"}
                    className="block w-full px-3 py-2 rounded-md border text-sm text-center"
                  >
                    Preview
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-16">
          <div>
            <h3 className="text-2xl font-semibold">Popular Stores</h3>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href={"/68dfd5fd5c999e143dc8ef01"}
              className="rounded-xl shadow"
            >
              <Nextimage
                src="/delhimarketplace.png"
                alt="Delhi marketplace"
                width={500}
                height={300}
              />
            </Link>
          </div>
        </section>
        {/* Testimonials */}
        <section className="mt-16">
          <h3 className="text-2xl font-semibold">
            Trusted by small businesses
          </h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Golu",
                comment:
                  "A2Z made it so easy to create my own store. I listed my products in minutes and started getting orders right away. Perfect for anyone starting out!",
              },
              {
                name: "Shivani",
                comment:
                  "I love how simple the platform is. No coding, no hassle — just upload my designs, set prices, and share my store. The clean design makes my brand look professional.",
              },
              {
                name: "Rahul",
                comment:
                  "I started a small store to sell handmade crafts. A2Z gave me a professional storefront that looks amazing on both desktop and mobile. Highly recommended!",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-gray-700">&quot;{item.comment}&quot;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {item?.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{item?.name}</div>
                    {/* <div className="text-xs text-gray-500">
                    Founder, Bloom & Co.
                  </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* CTA */}
        <section className="mt-16 bg-theme text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold">Ready to start selling?</h3>
            <p className="mt-2 text-indigo-100">
              Create your store and start accepting orders today.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/Store"
              className="px-6 py-3 rounded-md bg-white text-theme font-semibold"
            >
              Create Your Store Now!
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
