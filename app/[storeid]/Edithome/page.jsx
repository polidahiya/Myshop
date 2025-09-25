import React from "react";
import Slider from "./_Forms/Slider/Slider";
import About from "./_Forms/About/About";
import Banner from "./_Forms/Banner/Banner";
import Collections from "./_Forms/Collections/Collections";
import Faq from "./_Forms/Faq/Faq";
import Showcase from "./_Forms/Showcase/Showcase";
import { Authfn } from "@/lib/auth";
import { getStoreData } from "../Storedata";
import { Cachedproducts } from "../Cachedproducts";
import { notFound } from "next/navigation";
import { Edithomectxwrapper } from "./Edithomecontext";

async function page({ searchParams, params }) {
  const { storeid } = await params;
  const { isadmin, verified, ...rest } = await Authfn(storeid);
  if (storeid !== rest.storeid) notFound();

  const storedata = await getStoreData(storeid);
  const rawproducts = await Cachedproducts(storeid);
  let {
    add = "true",
    at = 0,
    category = "Slider",
    type = 1,
  } = await searchParams;
  add = add == "true";

  const filteredproducts = rawproducts.map((item) => ({
    _id: item?._id,
    name: item?.name,
    images: item?.images,
  }));

  const Forms = {
    Slider: {
      comp: (
        <Slider
          collections={storedata?.collections}
          products={filteredproducts}
        />
      ),
      data: {
        type,
        category: "Slider",
        props: {
          items: [
            {
              img: "",
              cover: true,
              title: "",
              desc: "",
              link: { type: "", id: "", collection: ["", ""] },
            },
          ],
        },
      },
    },
    About: {
      comp: <About />,
      data: {
        type,
        category: "About",
        props: {
          header: "",
          desc: "",
        },
      },
    },
    Banner: {
      comp: (
        <Banner
          collections={storedata?.collections}
          products={filteredproducts}
        />
      ),
      data: {
        type,
        category: "Banner",
        props: {
          items: [
            {
              img: "",
              cover: true,
              aspectratio: "2/1",
              title: "",
              desc: "",
              link: { type: "", id: "", collection: ["", ""] },
            },
          ],
        },
      },
    },
    Collections: {
      comp: <Collections collections={storedata?.collections} />,
      data: {
        type,
        category: "Collections",
        props: {
          collection: "",
          showheader: true,
        },
      },
    },
    Faq: {
      comp: <Faq />,
      data: {
        type,
        category: "Faq",
        props: {
          items: [
            {
              question: "",
              answer: "",
            },
          ],
        },
      },
    },
    Showcase: {
      comp: <Showcase products={filteredproducts} />,
      data: {
        type,
        category: "Showcase",
        props: {
          title: "",
          items: [],
        },
      },
    },
  };

  const selectedform = Forms[add ? category : storedata?.home[at]?.category];
  if (!selectedform) notFound();

  return (
    <Edithomectxwrapper
      initialdata={add ? selectedform?.data : storedata?.home[at]}
      add={add}
      at={at}
      storeid={storeid}
    >
      <div className="px-2 md:px-10">{selectedform?.comp}</div>
    </Edithomectxwrapper>
  );
}

export default page;
