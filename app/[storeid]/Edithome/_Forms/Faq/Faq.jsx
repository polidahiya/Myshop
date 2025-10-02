"use client";
import React from "react";
import Standardinputfield from "@/app/_globalcomps/inputfields/Standardinputfield";
import { AiOutlinePlus } from "react-icons/ai";
import { Edithomectxfn } from "../../Edithomecontext";
import { AppContextfn } from "@/app/Context";

export default function Faq() {
  const { setmessagefn } = AppContextfn();
  const { data, setdata } = Edithomectxfn();

  const Deleteslide = (index) => {
    const updated = { ...data.props };
    updated.items = updated.items.filter((_, i) => i !== index);
    setdata((pre) => ({ ...pre, props: updated }));
  };

  return (
    <div className="mt-5 p-2 border rounded-md">
      <div className="space-y-2">
        {data?.props?.items.map((item, i) => (
          <div key={i} className="space-y-2 border  p-2">
            <Standardinputfield
              titlename="Question"
              value={item?.question}
              onchange={(e) => {
                const updated = { ...data.props };
                updated.items[i].question = e.target.value;
                setdata((pre) => ({ ...pre, props: updated }));
              }}
              clear={() => {
                const updated = { ...data.props };
                updated.items[i].question = "";
                setdata((pre) => ({ ...pre, props: updated }));
              }}
            />
            {/* dsec */}
            <Standardinputfield
              titlename="Answer"
              value={item?.answer}
              onchange={(e) => {
                const updated = { ...data.props };
                updated.items[i].answer = e.target.value;
                setdata((pre) => ({ ...pre, props: updated }));
              }}
              clear={() => {
                const updated = { ...data.props };
                updated.items[i].answer = "";
                setdata((pre) => ({ ...pre, props: updated }));
              }}
            />
            <button
              type="button"
              className="border px-5 py-2 rounded-md "
              onClick={() => Deleteslide(i)}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            if (data?.props?.items.length >= 11) {
              setmessagefn("Maximum Questions limit reached");
              return;
            }
            const updated = { ...data.props };
            updated.items.push({
              question: "",
              answer: "",
            });
            setdata((pre) => ({ ...pre, props: updated }));
          }}
          className="w-full group relative flex items-center justify-center  rounded-2xl border-2 border-dashed border-slate-300 hover:border-theme hover:bg-blue-50 transition-all duration-200 ease-in-out p-5"
        >
          <AiOutlinePlus className="h-10 w-10 text-slate-400 group-hover:text-theme transition-colors" />
          <span className="text-sm font-medium text-slate-500 group-hover:text-theme">
            Add Question
          </span>
        </button>
      </div>
    </div>
  );
}
