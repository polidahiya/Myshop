import React from "react";
import { getStoreData } from "./Storedata";
import { Authfn } from "@/lib/auth";
import Category1 from "./_comps/Category/Category1";
import Hero1 from "./_comps/Hero/Hero1";
import Showcase1 from "./_comps/Showcase/Showcase1";
import About1 from "./_comps/About/About1";
import { testimage } from "@/lib/data";
import Compwrapper from "./_comps/Compwrapper";

const Compdata = {
  Navbar: [
    {
      id: 1,
      comp: Hero1,
      paid: false,
    },
  ],
  Hero: [
    {
      id: 1,
      comp: Hero1,
      paid: false,
    },
  ],
  Collections: [
    {
      id: 1,
      comp: Category1,
      paid: false,
    },
  ],
  Features: [
    {
      id: 1,
      comp: Category1,
      paid: false,
    },
  ],
  About: [
    {
      id: 1,
      comp: About1,
      paid: false,
    },
  ],
  Showcase: [
    {
      id: 1,
      comp: Showcase1,
      paid: false,
    },
  ],
  Reviews: [
    {
      id: 1,
      comp: Category1,
      paid: false,
    },
  ],
  Banner: [
    {
      id: 1,
      comp: Category1,
      paid: false,
    },
  ],
  Articles: [
    {
      id: 1,
      comp: Category1,
      paid: false,
    },
  ],
  FAQ: [
    {
      id: 1,
      comp: Category1,
      paid: false,
    },
  ],
  Contact: [
    {
      id: 1,
      comp: Category1,
      paid: false,
    },
  ],
  Footer: [
    {
      id: 1,
      comp: Category1,
      paid: false,
    },
  ],
};

const data = [
  {
    type: 1,
    category: "Hero",
    props: {
      items: [
        {
          img: testimage,
          title: "Rentbean",
          desc: "",
          link: "/rentbean",
        },
        {
          img: testimage,
          title: "Rentbean",
          desc: "",
          link: "/rentbean",
        },
        {
          img: testimage,
          title: "Rentbean",
          desc: "",
          link: "/rentbean",
        },
      ],
    },
  },
  {
    type: 1,
    category: "Collections",
    props: {
      collection: "Types",
      showheader: true,
    },
  },
  {
    type: 1,
    category: "Showcase",
    props: {
      items: [
        {
          img: testimage,
          cover: true,
        },
        {
          img: testimage,
          cover: true,
        },
        {
          img: testimage,
          cover: true,
        },
        {
          img: testimage,
          cover: true,
        },
      ],
    },
  },
  {
    type: 1,
    category: "About",
    props: {
      heading: "About A2Z Stores",
      para: [
        `A2Z is your one-stop platform to create and grow your online store. We
        empower entrepreneurs and businesses of all sizes to showcase their
        products, reach customers, and scale effortlessly. With simple tools,
        seamless design, and flexible features, we make sure your ideas turn
        into reality — from A to Z.`,
      ],
    },
  },
];

export default async function page({ params }) {
  const { storeid } = await params;
  const storedata = await getStoreData(storeid);

  return (
    <div className="space-y-5 md:space-y-10 mb-10">
      {data.map((comp, i) => {
        const selectedcomp = Compdata[comp.category]?.find(
          (item) => item?.id == comp?.type
        );
        const Render = selectedcomp?.comp;
        return (
          <div key={i}>
            <Compwrapper storeid={storeid} i={i}>
              <Render storeid={storeid} {...comp?.props} />
            </Compwrapper>
          </div>
        );
      })}
    </div>
  );
}
