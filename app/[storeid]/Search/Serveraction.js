"use server";
import { Cachedproducts } from "../Cachedproducts";

export async function Searchproducts(query, storeid) {
  try {
    const products = await Cachedproducts(storeid);
    if (!query)
      return {
        status: 400,
        data: [],
        message: "Please enter a search query.",
      };

    const words = query.toLowerCase().split(/\s+/).filter(Boolean);

    const filteredProducts = products.filter((product) => {
      const text = [
        product?.name || "",
        product?.seotitle || "",
        product?.seokeywords || "",
      ]
        .join(" ")
        .toLowerCase();

      // Check that every word is found somewhere in text
      return words.every((word) => text.includes(word));
    });

    return {
      status: 200,
      data: filteredProducts || [],
      message: "Search results",
    };
  } catch (error) {
    return {
      status: 500,
      data: [],
      message: "Server error!",
    };
  }
}
