import React from "react";
import Ads from "./_comps/Ads";
import Productcard from "./_comps/Productcard/Productcard";
import Newbutton from "./_comps/Newbutton";
import Filters from "./_comps/Filters/Filters";
import Heading from "./_comps/Heading/Heading";
import { getStoreData } from "../Storedata";
import { Cachedproducts } from "../Cachedproducts";
import { Authfn } from "@/lib/auth";
import Nextimage from "@/app/_globalcomps/Nextimage";
import Googleads from "@/app/_globalcomps/ads/Googleads";

async function page({ params, searchParams }) {
  const { storeid } = await params;
  const { isadmin } = await Authfn(storeid);
  const allsearchparams = await searchParams;
  const storedata = await getStoreData(storeid);
  const rawproducts = await Cachedproducts(storeid);
  //
  const allfilternames = storedata?.collections.map((item) => item?.name);

  // filters that are actually present in searchParams
  const appliedfilters = allfilternames
    .filter((item) => allsearchparams[item])
    .map((item) => allsearchparams[item]);

  const filteredproducts = rawproducts.filter((product) =>
    appliedfilters.every((filter) =>
      product.collections.some((col) => col === filter)
    )
  );

  const products = appliedfilters.length > 0 ? filteredproducts : rawproducts;

  //
  return (
    <div className="px-2 md:px-10 pb-10">
      <Heading />
      <div className="flex gap-5">
        <Filters
          allsearchparams={allsearchparams}
          collections={storedata?.collections}
        />
        {isadmin || products.length > 0 ? (
          <div className="sticky top-20 h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10">
            {isadmin && <Newbutton storeid={storeid} />}
            {products.map((product, i) => (
              <React.Fragment key={i}>
                <Productcard
                  storeid={storeid}
                  product={product}
                  isadmin={isadmin}
                />
                {<Ads i={i} />}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="sticky top-20 flex justify-center mt-5 h-fit w-full">
            <Nextimage
              src="/productnotfound.png"
              alt="noresult"
              width={500}
              height={500}
              quality={100}
            />
          </div>
        )}
      </div>
      <Googleads type={2} />
    </div>
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
