import React from "react";
import { getStoreData } from "./Storedata";
import { Authfn } from "@/lib/auth";
import Category1 from "./_comps/Category/Category1";
import Hero1 from "./_comps/Hero/Hero1";

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
      comp: Category1,
      paid: false,
    },
  ],
  Showcase: [
    {
      id: 1,
      comp: Category1,
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
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO0s6oSQhf6FFBJRQPa4_J2hZRaMDylYhn0A&s",
          title: "Rentbean",
          desc: "",
          link: "/rentbean",
        },
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO0s6oSQhf6FFBJRQPa4_J2hZRaMDylYhn0A&s",
          title: "Rentbean",
          desc: "",
          link: "/rentbean",
        },
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO0s6oSQhf6FFBJRQPa4_J2hZRaMDylYhn0A&s",
          title: "Rentbean",
          desc: "",
          link: "/rentbean",
        },
      ],
    },
  },
];

export default async function page({ params }) {
  const { storeid } = await params;
  const storedata = await getStoreData(storeid);

  return (
    <div className="space-y-5 md:space-y-10">
      {data.map((comp, i) => {
        const selectedcomp = Compdata[comp.category].find(
          (item) => item.id == comp.type
        );
        const Render = selectedcomp?.comp;
        return (
          <div key={i}>
            <Render storedata={storedata} {...comp.props} />
          </div>
        );
      })}
    </div>
  );
}
