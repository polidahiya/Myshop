import React from "react";
import { getStoreData } from "./Storedata";
import { Authfn } from "@/lib/auth";
import CategoriesGrid from "./_comps/Category/Category1";
import Hero from "./_comps/Hero/Hero";

const category = {
  Navbar: CategoriesGrid,
  Hero: Hero,
  Collections: CategoriesGrid,
  Features: CategoriesGrid,
  About: CategoriesGrid,
  Showcase: CategoriesGrid,
  Reviews: CategoriesGrid,
  Banner: CategoriesGrid,
  Articles: CategoriesGrid,
  FAQ: CategoriesGrid,
  Contact: CategoriesGrid,
  Footer: CategoriesGrid,
};

const comps = [
  {
    type: 1,
    category: "Hero",
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
];

async function page({ params }) {
  const { storeid } = await params;
  const storedata = await getStoreData(storeid);

  return (
    <div className="space-y-5 md:space-y-10">
      {comps.map((comp, i) => {
        const Component = category[comp.category];
        return <Component key={i} storeid={storeid} comp={comp} />;
      })}
      <CategoriesGrid storeid={storeid} />
    </div>
  );
}

export default page;
