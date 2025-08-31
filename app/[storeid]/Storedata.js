import { unstable_cache } from "next/cache";
const storedata = {
  storename: "",
  storetype: "",
  logo: "",
  email: "",
  color: {
    theme: "#ffac1b",
    secondary: "",
    text: "#525252",
  },
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
  contact: {
    phone: "",
    whatsapp: "",
    location: "",
  },
  categories: {
    "Living-Room": {
      desc: "",
      img: "",
      keywords: "",
      subcat: {
        sofa: "",
        chair: "",
        table: "",
        lamps: "",
      },
    },
  },
};

export function getStoreData(storeId = "test1") {
  return storedata;
  return unstable_cache(
    async () => {
      return storedata;
    },
    [`store-${storeId}`],
    {
      revalidate: 7 * 24 * 60 * 60,
      tags: [`store-${storeId}`],
    }
  )();
}
