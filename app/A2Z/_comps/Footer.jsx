import React from "react";

function Footer() {
  return (
    <footer id="contact" className="mt-12 text-sm text-gray-500 px-6 pb-14">
      <div className="border-t pt-6 flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
          <div className="font-semibold">A2Z</div>
          <div className="mt-2">
            Build and grow your online store — simple tools for busy founders.
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
          {/* <div className="font-semibold">Contact</div> */}
          {/* <div className="mt-2">hello@A2Z.example</div> */}
          <div className="text-xs text-gray-400 mt-2">
            © {new Date().getFullYear()} A2Z — Made with ♥
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
