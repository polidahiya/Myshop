import { unstable_cache } from "next/cache";
import { getcollection } from "@/lib/db";
const prestoredata = {
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

export function getStoreData(storeId) {
  return unstable_cache(
    async () => {
      const { storescollection, ObjectId } = await getcollection();
      const query = ObjectId.isValid(storeId)
        ? { _id: new ObjectId(storeId) }
        : { slug: storeId };
      const storedata = await storescollection.findOne(query);
      return storedata || prestoredata;
    },
    [`store-${storeId}`],
    {
      revalidate: 7 * 24 * 60 * 60,
      tags: [`store-${storeId}`],
    }
  )();
}
