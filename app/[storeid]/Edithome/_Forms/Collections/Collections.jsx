"use client";
import React from "react";
import Togglebuttons from "@/app/_globalcomps/inputfields/Togglebuttons";
import { Edithomectxfn } from "../../Edithomecontext";
import Dropdownmenu from "@/app/_globalcomps/inputfields/Dropdownmenu";

function Collections({ collections }) {
  const { data, setdata } = Edithomectxfn();

  return (
    <div className="mt-5 p-4 border rounded-md space-y-4">
      <Dropdownmenu
        title="Collection"
        state={data?.props?.collection}
        onchange={(value) => {
          const updated = { ...data.props };
          updated.collection = value;
          setdata((pre) => ({ ...pre, props: updated }));
        }}
        options={collections.map((item) => item.name)}
      />
      <Togglebuttons
        titlename="Show Header :"
        value={data?.props?.showheader}
        positive={() => {
          const updated = { ...data.props };
          updated.showheader = true;
          setdata((pre) => ({ ...pre, props: updated }));
        }}
        negative={() => {
          const updated = { ...data.props };
          updated.showheader = false;
          setdata((pre) => ({ ...pre, props: updated }));
        }}
        positiveText="Show"
        negativeText="Hide"
      />
    </div>
  );
}

export default Collections;
