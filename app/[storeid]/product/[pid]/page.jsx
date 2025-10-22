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
import { Getuserdata } from "@/app/_globalcomps/Getuserdata";

async function page({ params }) {
  const { storeid, pid: productid } = await params;
  const { verified, isadmin } = await Authfn(storeid);
  let issavedproduct = false;

  if (verified) {
    const userdata = await Getuserdata();
    issavedproduct = userdata?.savedproducts?.includes(productid);
  }

  const storedata = await getStoreData(storeid);

  const products = await Cachedproducts(storeid);
  const product = products.find((product) => product?._id == productid);
  if (!product) notFound();

  const similarproducts = products
    .filter(
      (item) => item?.category === product?.category && item?._id !== productid
    )
    .slice(0, 15);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.name,
    image: product.images,

    description: product.descriptions.join("____") || "",

    sku: product?._id,
    productID: product?._id,
    category: product?.collections.join(", ") || "",

    brand: {
      "@type": "Brand",
      name: storedata?.storename,
    },

    offers: {
      "@type": "Offer",
      url: `https://a2z-zeta.vercel.app/${storeid}/product/${productid}`,
      priceCurrency: "INR",
      price: parseInt(product?.price, 10),
      availability:
        product.available && (Number(product?.stocks) || 0) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: storedata?.storename,
      },
    },
  };

  return (
    <Productctxwrapper product={product}>
      <div className="min-h-screen">
        <div className="md:mt-8 flex flex-col lg:flex-row gap-10 md:px-10">
          <div className="w-full lg:w-1/2">
            <Imagescomp images={product?.images} name={product?.name} />
            {/* routes */}
            <div className="text-sm mt-10 px-5">
              <Link prefetch={false} href={`/${storeid}`}>
                Home
              </Link>
              <span className="select-none pointer-events-none"> / </span>
              <Link prefetch={false} href={`/${storeid}/collections`}>
                Collections
              </Link>
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
              issavedproduct={issavedproduct}
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
            prefetch={false}
            href={`/${storeid}/product/add?edit=${product?._id}`}
            className="fixed top-24 right-5  bg-[var(--usertheme)] text-white border border-white rounded-full w-10 aspect-square flex items-center justify-center z-20"
          >
            <MdModeEditOutline />
          </Link>
        )}
      </div>
      {/* ld json */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
    </Productctxwrapper>
  );
}

export const generateMetadata = async ({ params }) => {
  const { storeid, pid: productid } = await params;
  const storedata = await getStoreData(storeid);

  const products = await Cachedproducts(storeid);
  const product = products.find((product) => product?._id == productid);

  const title = product?.seotitle || "A2Z Stores - Explore Amazing Products";
  const description =
    product?.seodescription || "Hey there! Checkout my Amazing collections";
  const keywords = product?.seokeywords || "";
  const image = product?.images[0] || "";
  const url = `https://a2z-zeta.vercel.app/${storeid}/product/${product?._id}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      images: product?.images.map((image) => {
        return { url: image };
      }),
      url,
      site_name: storedata?.storename,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    additionalMetaTags: [
      { property: "og:type", content: "product" }, // Facebook Open Graph type
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
  };
};

export default page;
