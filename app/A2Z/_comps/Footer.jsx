import React from "react";
import Link from "next/link";

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
            <div className="font-semibold">Company</div>
            <ul className="mt-2 space-y-2">
              <Link className="block" href="/A2Z/Aboutus">
                About
              </Link>
              <Link className="block" href="/A2Z/Privacypolicy">
                Privacy Policy
              </Link>
              <Link className="block" href="/A2Z/Termsandconditions">
                Terms and Conditions
              </Link>
            </ul>
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-400 mt-2">
            © {new Date().getFullYear()} A2Z — Made with ♥
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
