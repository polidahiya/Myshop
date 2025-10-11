// app/api/manifest/route.js
import { getStoreData } from "@/app/[storeid]/Storedata";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const storeid = searchParams.get("storeid");

    if (!storeid) {
      return new Response(JSON.stringify({ error: "Missing storeid" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const store = await getStoreData(storeid);

    const manifest = {
      name: store?.storename || "A2Z Store",
      short_name: store?.storename?.slice(0, 12) || "A2Z",
      description: "Check out amazing collections on A2Z Stores.",
      start_url: `/${storeid}`,
      display: "standalone",
      background_color: "#ffffff",
      theme_color: store?.color?.theme || "#ffffff",
      icons: [
        {
          src:
            store?.logo.replace(
              "/upload/",
              `/upload/w_${192},h_${192},c_fill/`
            ) || "/favicon.ico",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src:
            store?.logo.replace(
              "/upload/",
              `/upload/w_${512},h_${512},c_fill/`
            ) || "/favicon.ico",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    };

    return new Response(JSON.stringify(manifest), {
      status: 200,
      headers: { "Content-Type": "application/manifest+json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
