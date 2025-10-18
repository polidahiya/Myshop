"use server";

import { getcollection } from "@/lib/db";
import { unstable_cache } from "next/cache";

const domain = "https://a2z-zeta.vercel.app";
const CACHE_TIME = 86400; // 24 hours
const today = new Date().toISOString().split("T")[0];

// --- Utility: Escape XML special chars
const xmlEscape = (str) =>
  str
    ?.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// --- Cached DB Fetch ---
export const getAllStoresData = unstable_cache(
  async () => {
    const { storescollection } = await getcollection();
    const stores = await storescollection.find({}).toArray();

    return stores.map((store) => ({
      loc: `${domain}/${store._id}`,
      lastmod: today,
      changefreq: "daily",
      priority: "1.0",
      image: store.logo || "",
      name: store.storename || "",
    }));
  },
  ["allstores"],
  {
    revalidate: CACHE_TIME,
    tags: ["allstores"],
  }
);

export const allproductsdata = unstable_cache(
  async () => {
    const { Productscollection } = await getcollection();
    const products = await Productscollection.find({}).toArray();

    return products.map((product) => ({
      loc: `${domain}/${product?.storeid}/product/${product?._id}`,
      lastmod: today,
      changefreq: "daily",
      priority: "1.0",
      image: product?.images[0] || "",
      name: product?.name || "",
    }));
  },
  ["allproducts"],
  {
    revalidate: CACHE_TIME,
    tags: ["allproducts"],
  }
);

// --- Sitemap Route Handler ---
export async function GET() {
  try {
    const storeUrls = await getAllStoresData();
    const productsurl = await allproductsdata();

    // Generate all URLs
    const allUrls = [
      {
        loc: domain,
        lastmod: today,
        changefreq: "daily",
        priority: "1.0",
      },
      ...storeUrls,
      ...productsurl,
    ];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls
  .map(
    (url) => `
  <url>
    <loc>${xmlEscape(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    ${
      url.image
        ? `<image:image>
      <image:loc>${xmlEscape(url.image)}</image:loc>
      <image:caption>${xmlEscape(url.name)}</image:caption>
      <image:title>${xmlEscape(url.name)}</image:title>
    </image:image>`
        : ""
    }
  </url>`
  )
  .join("\n")}
</urlset>`;

    // Return XML Response
    return new Response(sitemap, {
      status: 200,
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  } catch (error) {
    console.error("Sitemap Generation Error:", error);
    return new Response(
      `<error><message>Failed to generate sitemap</message></error>`,
      { status: 500, headers: { "Content-Type": "application/xml" } }
    );
  }
}
