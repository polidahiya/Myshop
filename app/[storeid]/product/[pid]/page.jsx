import React from "react";
import Details from "./_comps/Details";
import Imagescomp from "./_comps/Imagescomp";
import Productsslide from "../../_globalcomps/Productsslide";
import Link from "next/link";
import { Cachedproducts } from "@/app/[storeid]/Cachedproducts";
import { notFound } from "next/navigation";
import { MdModeEditOutline } from "react-icons/md";
import { Productctxwrapper } from "./Productcontext";
import { Authfn } from "@/lib/auth";
import { getStoreData } from "../../Storedata";
import Googleads from "@/app/_globalcomps/ads/Googleads";

async function page({ params }) {
  const { storeid, pid: productid } = await params;
  const { isadmin } = await Authfn(storeid);
  const storedata = await getStoreData(storeid);

  const products = await Cachedproducts(storeid);
  const product = products.find((product) => product?._id == productid);
  if (!product) notFound();

  const similarproducts = products
    .filter(
      (item) => item?.category === product?.category && item?._id !== productid
    )
    .slice(0, 15);

  return (
    <Productctxwrapper product={product}>
      <div className="min-h-screen">
        <div className="md:mt-8 flex flex-col lg:flex-row gap-10 md:px-10">
          <div className="w-full lg:w-1/2">
            <Imagescomp images={product?.images} name={product?.name} />
            {/* routes */}
            <div className="text-sm mt-10 px-5">
              <Link href={`/${storeid}`}>Home</Link>
              <span className="select-none pointer-events-none"> / </span>
              <Link href={`/${storeid}/collections`}>Collections</Link>
              <span className="select-none pointer-events-none"> / </span>
              <span className="capitalize text-[var(--secondary)]">
                {product?.name}
              </span>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <Details
              product={product}
              whatsappnum={storedata?.contact?.whatsapp}
            />
          </div>
        </div>
        {/* similar products */}
        <div>
          {similarproducts.length != 0 && (
            <Productsslide heading="Related Products" data={similarproducts} />
          )}
        </div>
        <div className="w-full overflow-hidden">
          <Googleads type={2} />
        </div>
        {/* edit button */}
        {isadmin && (
          <Link
            href={`/${storeid}/product/add?edit=${product?._id}`}
            className="fixed top-24 right-5  bg-[var(--usertheme)] text-white border border-white rounded-full w-10 aspect-square flex items-center justify-center z-20"
          >
            <MdModeEditOutline />
          </Link>
        )}
      </div>
    </Productctxwrapper>
  );
}

// export const generateMetadata = async ({ params }) => {
//   const props = (await params).props;
//   const sku = props[0];
//   const color = props[1] || 0;

//   const products = await Cachedproducts();
//   const product = products.filter((product) => product?.sku === sku)[0];

//   const title = product?.seotitle || "AltOrganisers - Explore Amazing Products";
//   const description =
//     product?.seodescription ||
//     "Check out this amazing product at AltOrganisers!";
//   const keywords = product?.seokeywords || "";
//   const image = product?.variants[color]?.images[0] || "/default-image.jpg"; // Default image if no variant image is found
//   const url = `https://altorganisers.com/product/${sku}/${color}`;

//   return {
//     title,
//     description,
//     keywords,
//     openGraph: {
//       title,
//       description,
//       images: [{ url: image }],
//       url, // URL of the page
//       site_name: "AltOrganisers",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [image],
//     },
//     additionalMetaTags: [
//       { property: "og:type", content: "product" }, // Facebook Open Graph type
//       { property: "og:title", content: title },
//       { property: "og:description", content: description },
//       { property: "og:image", content: image },
//       { property: "og:url", content: url },
//       { name: "twitter:title", content: title },
//       { name: "twitter:description", content: description },
//       { name: "twitter:image", content: image },
//     ],
//   };
// };

export default page;
