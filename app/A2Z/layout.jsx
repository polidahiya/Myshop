import React from "react";
import Navbar from "./_comps/Navbar";
import Footer from "./_comps/Footer";

function layout({ children }) {
  return (
    <div className="min-h-screen  text-gray-900">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default layout;
