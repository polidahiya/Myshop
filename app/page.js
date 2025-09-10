import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header / Navbar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-md flex items-center justify-center text-white font-bold">
              A2Z
            </div>
            <div>
              <h1 className="text-lg font-semibold">A2Z</h1>
              <p className="text-xs text-gray-500">
                Create your online store — fast
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-indigo-600">
              Features
            </a>
            <a href="#templates" className="hover:text-indigo-600">
              Templates
            </a>
            <a href="#pricing" className="hover:text-indigo-600">
              Pricing
            </a>
            <a href="#contact" className="hover:text-indigo-600">
              Contact
            </a>
            <button className="ml-4 px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50">
              Login
            </button>
            <button className="ml-2 px-4 py-2 rounded-md bg-indigo-600 text-white shadow">
              Get Started
            </button>
          </nav>

          <div className="md:hidden">
            <button className="px-3 py-2 rounded-md border">Menu</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-14">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Launch your online store in minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Beautiful storefronts, secure checkout, and everything you need to
              sell online — simple pricing and zero setup hassles.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-md border w-full md:w-auto min-w-[220px]"
              />
              <button className="px-6 py-3 rounded-md bg-indigo-600 text-white font-medium">
                Start free trial
              </button>
              <button className="px-4 py-3 rounded-md border">
                Talk to sales
              </button>
            </div>

            <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
              <div>✅ No credit card required</div>
              <div>⚡ Quick setup</div>
              <div>🔒 Secure payments</div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-white shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Your store is ready</h3>
                  <p className="text-xs text-gray-500">
                    Preview your store across devices
                  </p>
                </div>
                <div className="text-xs text-gray-400">Demo</div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-3">
                  <div className="h-28 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                    Store preview
                  </div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="h-28 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                    Mobile preview
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                Templates • Payments • Shipping • Orders
              </div>
            </div>

            <div className="absolute -right-6 -bottom-6 hidden md:block">
              <div className="w-48 h-48 bg-gradient-to-br from-pink-300 to-yellow-300 rounded-xl transform rotate-6 opacity-80"></div>
            </div>
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
            {new Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4">
                <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                  Template {idx + 1}
                </div>
                <h4 className="mt-3 font-semibold">Modern store</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Perfect for clothing, accessories and small brands.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm">
                    Use template
                  </button>
                  <button className="px-3 py-2 rounded-md border text-sm">
                    Preview
                  </button>
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
                name: "Starter",
                price: "Free",
                perks: ["Single store", "Limited themes", "Basic support"],
              },
              {
                name: "Grow",
                price: "₹499/mo",
                perks: [
                  "Multiple stores",
                  "Premium themes",
                  "Payments & shipping",
                ],
              },
              {
                name: "Scale",
                price: "Custom",
                perks: [
                  "Dedicated support",
                  "Enterprise features",
                  "SLAs & onboarding",
                ],
              },
            ].map((p) => (
              <div key={p.name} className="bg-white rounded-2xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold">{p.name}</h4>
                <div className="mt-4 text-3xl font-extrabold">{p.price}</div>
                <ul className="mt-4 text-sm text-gray-600 space-y-2">
                  {p.perks.map((x) => (
                    <li key={x}>• {x}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <button className="w-full px-4 py-3 rounded-md bg-indigo-600 text-white">
                    Choose {p.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-16">
          <h3 className="text-2xl font-semibold">
            Trusted by small businesses
          </h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {new Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-gray-700">
                  "Sales doubled after moving online with this platform. Setup
                  was super quick."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    JD
                  </div>
                  <div>
                    <div className="font-semibold">Jaya Doe</div>
                    <div className="text-xs text-gray-500">
                      Founder, Bloom & Co.
                    </div>
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
            <button className="px-6 py-3 rounded-md bg-white text-indigo-600 font-semibold">
              Start free trial
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="mt-12 text-sm text-gray-500">
          <div className="border-t pt-6 flex flex-col md:flex-row items-start justify-between gap-6">
            <div>
              <div className="font-semibold">A2Z</div>
              <div className="mt-2">
                Build and grow your online store — simple tools for busy
                founders.
              </div>
            </div>

            <div className="flex gap-10">
              <div>
                <div className="font-semibold">Product</div>
                <ul className="mt-2 space-y-2">
                  <li>Features</li>
                  <li>Templates</li>
                  <li>Pricing</li>
                </ul>
              </div>

              <div>
                <div className="font-semibold">Company</div>
                <ul className="mt-2 space-y-2">
                  <li>About</li>
                  <li>Careers</li>
                  <li>Blog</li>
                </ul>
              </div>
            </div>

            <div>
              <div className="font-semibold">Contact</div>
              <div className="mt-2">hello@A2Z.example</div>
              <div className="text-xs text-gray-400 mt-2">
                © {new Date().getFullYear()} A2Z — Made with ♥
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
