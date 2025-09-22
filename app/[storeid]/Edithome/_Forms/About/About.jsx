"use client";
import React from "react";
import Standardinputfield from "@/app/_globalcomps/inputfields/Standardinputfield";
import { Edithomectxfn } from "../../Edithomecontext";

export default function About() {
  const { data, setdata } = Edithomectxfn();
  
  return (
    <div className="mt-5 p-4 border rounded-md space-y-2">
      <Standardinputfield
        titlename="Header" 
        value={data?.props?.header}
        onchange={(e) => {
          const updated = { ...data.props };
          updated.header = e.target.value;
          setdata((pre) => ({ ...pre, props: updated }));
        }}
        clear={() => {
          const updated = { ...data.props };
          updated.header = "";
          setdata((pre) => ({ ...pre, props: updated }));
        }}
      />
      {/* dsec */}
      <Standardinputfield
        titlename="About"
        value={data?.props?.desc}
        onchange={(e) => {
          const updated = { ...data.props };
          updated.desc = e.target.value;
          setdata((pre) => ({ ...pre, props: updated }));
        }}
        clear={() => {
          const updated = { ...data.props };
          updated.desc = "";
          setdata((pre) => ({ ...pre, props: updated }));
        }}
      />
    </div>
  );
}
