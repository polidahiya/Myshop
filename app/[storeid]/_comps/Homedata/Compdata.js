import dynamic from "next/dynamic";

export const Compdata = {
  Slider: [
    {
      type: 1,
      comp: dynamic(() => import("../Slider/Slider1")),
      paid: false,
      img: "/Homecomps/slider1.png",
    },
    {
      type: 2,
      comp: dynamic(() => import("../Slider/Slider2")),
      paid: false,
      img: "/Homecomps/slider2.png",
    },
  ],
  Collections: [
    {
      type: 1,
      comp: dynamic(() => import("../Collections/Collections1")),
      paid: false,
      img: "/Homecomps/collection1.png",
    },
    {
      type: 2,
      comp: dynamic(() => import("../Collections/Collections2")),
      paid: false,
      img: "/Homecomps/collection2.png",
    },
  ],
  About: [
    {
      type: 1,
      comp: dynamic(() => import("../About/About1")),
      paid: false,
      img: "/Homecomps/about1.png",
    },
  ],
  Showcase: [
    {
      type: 1,
      comp: dynamic(() => import("../Showcase/Showcase1")),
      paid: false,
      img: "/Homecomps/showcase1.png",
    },
  ],
  Banner: [
    {
      type: 1,
      comp: dynamic(() => import("../Banner/Banner1")),
      paid: false,
      img: "/Homecomps/banner1.png",
    },
  ],
  Faq: [
    {
      type: 1,
      comp: dynamic(() => import("../Faq/Faq1")),
      paid: false,
      img: "/Homecomps/faq1.png",
    },
  ],
};

export const Compdatawithoutcompsfn = () => {
  function stripComp(obj) {
    if (Array.isArray(obj)) {
      return obj.map(stripComp);
    } else if (typeof obj === "object" && obj !== null) {
      const { comp, ...rest } = obj; // remove comp
      return Object.fromEntries(
        Object.entries(rest).map(([key, value]) => [key, stripComp(value)])
      );
    }
    return obj;
  }
  return stripComp(Compdata);
};
