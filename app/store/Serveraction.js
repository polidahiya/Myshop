"use server";
import { z } from "zod";
import { getcollection } from "@/lib/db";
import Verification from "@/lib/verification";
import { generateToken } from "../account/Serveraction";

// ✅ Zod schema validation
const storeSchema = z.object({
  storename: z.string().min(1, "Store name is required"),
  storetype: z.string().min(1, "Store type is required"),
  contact: z.object({
    phone: z.string().min(5, "Phone is required"),
    whatsapp: z.string().min(5, "WhatsApp is required"),
    location: z.string().min(1, "Location is required"),
  }),
  color: z.object({
    theme: z.string().optional(),
    secondary: z.string().optional(),
    text: z.string().optional(),
  }),
  social: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
  }),
});

export async function saveStore(formData) {
  try {
    const tokenres = await Verification();
    if (!tokenres.verified || tokenres.storeid) {
      return { status: 400, message: "Invalid user" };
    }
    // Validate with Zod
    const data = storeSchema.parse(formData);

    const finaldata = {
      ...data,
      owner: tokenres?.email,
      createdat: new Date(),
    };

    // Get your collections
    const { storescollection } = await getcollection();
    const result = await storescollection.insertOne(finaldata);
    // update token here
    await generateToken({
      email: tokenres?.email,
      usertype: tokenres?.usertype,
      storeid: result?._id,
    });

    return { status: 200, message: "Store created successfully" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.errors);
      return { status: 400, message: "Invalid fields" };
    }
    console.error("Save Error:", err);
    return { status: 500, message: "Server error" };
  }
}
