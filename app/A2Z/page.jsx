import React from "react";
import Link from "next/link";
import Nextimage from "../_globalcomps/Nextimage";

export default function HomePage() {
  return (
    <main className="px-6 pt-14">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight font-tenor">
            Launch your online store in minutes
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-[500px]">
            Beautiful storefronts, secure checkout, and everything you need to
            sell online — simple pricing and zero setup hassles.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/account/signup"
              className="px-6 py-3 rounded-md bg-indigo-600 text-white font-medium"
            >
              Start free trial
            </Link>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500 mt-10 md:mt-20 text-center">
            <div className="flex flex-col md:flex-row items-center">
              <span>✅</span> <p>No credit card required</p>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <span>⚡</span> <p>Quick setup</p>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <span>🔒</span> <p> Secure payments</p>
            </div>
          </div>
        </div>

        <div className="">
          <Nextimage
            src="/homepage/heroresponsiveimage.png"
            alt="Responsive image"
            height={500}
            width={500}
            className="w-full object-cover my-7"
          />
        </div>
      </section>

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
                  className="block w-full px-3 py-2 rounded-md bg-indigo-600 text-white text-sm text-center"
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

      {/* Pricing */}
      <section id="pricing" className="mt-16">
        <h3 className="text-2xl font-semibold">Simple pricing</h3>
        <p className="text-gray-600 mt-1">
          Choose a plan that fits your business.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Choose Starter",
              price: "Free",
              perks: ["Single store", "Limited themes", "Basic support"],
              link: "/account/signup",
            },
            {
              name: "Comming soon!",
              //   name: "Choose Grow",
              price: "₹499/mo",
              perks: [
                "Multiple stores",
                "Premium themes",
                "Payments & shipping",
              ],
              link: "/A2Z",
            },
            {
              name: "Comming soon!",
              //   name: "Choose Scale",
              price: "Custom",
              perks: [
                "Dedicated support",
                "Enterprise features",
                "SLAs & onboarding",
              ],
              link: "/A2Z",
            },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="text-lg font-semibold">{p.name}</h4>
              <div className="mt-4 text-3xl font-extrabold">{p.price}</div>
              <ul className="mt-4 text-sm text-gray-600 space-y-2">
                {p.perks.map((x) => (
                  <li key={x}>• {x}</li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href={p.link}
                  className="block w-full px-4 py-3 rounded-md bg-indigo-600 text-white text-center"
                >
                  {p.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-16">
        <h3 className="text-2xl font-semibold">Trusted by small businesses</h3>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Rajbir Dahiya",
              comment:
                "A2Z made it so easy to create my own store. I listed my products in minutes and started getting orders right away. Perfect for anyone starting out!",
            },
            {
              name: "Shivani",
              comment:
                "I love how simple the platform is. No coding, no hassle — just upload my designs, set prices, and share my store. The clean design makes my brand look professional.",
            },
            {
              name: "Ravi",
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
      <section className="mt-16 bg-indigo-600 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold">Ready to start selling?</h3>
          <p className="mt-2 text-indigo-100">
            Create your store and start accepting orders today.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            href="/account/signup"
            className="px-6 py-3 rounded-md bg-white text-indigo-600 font-semibold"
          >
            Start free trial
          </Link>
        </div>
      </section>
    </main>
  );
}
