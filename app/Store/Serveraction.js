"use server";
import { z } from "zod";
import { getcollection } from "@/lib/db";
import Verification from "@/lib/verification";
import { generateToken } from "../account/Serveraction";
import { Deleteimages } from "@/lib/Addordeleteimages";
import { revalidateTag } from "next/cache";

// ✅ Zod schema validation
const contactSchema = z.object({
  phone: z.string(),
  whatsapp: z.string(),
  location: z.string(),
});

// Color schema (you can add regex for hex validation if needed)
const colorSchema = z.object({
  theme: z.string(),
  secondary: z.string(),
  text: z.string(),
});

// Social schema (flexible keys allowed, values must be string links)
const socialSchema = z.record(z.string());

// Subcategory schema
const subCategorySchema = z.object({
  name: z.string(),
  image: z.array(z.string()), // can be URLs
});

// Collection schema
const collectionSchema = z.object({
  name: z.string(),
  image: z.array(z.string()),
  subcat: z.array(subCategorySchema),
});

// Root schema
const newstoreSchema = z
  .object({
    _id: z.string().optional(),
    email: z.string().optional(),
    createdat: z.string().optional(),
    lastupdated: z.string().optional(),
    storename: z.string(),
    storetype: z.string(),
    contact: contactSchema,
    color: colorSchema,
    social: socialSchema,
    collections: z.array(collectionSchema),
  })
  .strict();

export async function saveStore(formData, deletedimages) {
  try {
    const tokenres = await Verification("public");
    if (!tokenres.verified) {
      return { status: 400, message: "Invalid user" };
    }

    // Validate with Zod
    const data = formData;
    // const data = newstoreSchema.parse(formData);

    // delete images
    if (deletedimages && deletedimages.length > 0)
      await Deleteimages(deletedimages, "Mystore");

    // Get your collections
    const { storescollection, userscollection, ObjectId } =
      await getcollection();

    if (formData?._id) {
      // update
      const { _id, ...updateFields } = formData;
      await storescollection.updateOne(
        { _id: new ObjectId(tokenres.storeid) },
        { $set: { ...updateFields, lastupdated: new Date() } }
      );
      revalidateTag(`store-${tokenres.storeid}`);
      revalidateTag(`userdata-${tokenres.email}`);
      return {
        status: 200,
        message: "Update successfully",
      };
    } else {
      const finaldata = {
        ...data,
        email: tokenres?.email,
        createdat: new Date(),
      };

      const store = await storescollection.findOne({ email: tokenres?.email });
      if (store) return { status: 400, message: "Store already exists" };

      const result = await storescollection.insertOne(finaldata);
      const storeid = result?.insertedId.toString();
      await userscollection.updateOne(
        { email: tokenres?.email },
        { $set: { storeid } }
      );

      // update token here
      await generateToken({
        email: tokenres?.email,
        usertype: tokenres?.usertype,
        storeid,
      });
      revalidateTag(`store-${storeid}`);

      return {
        status: 200,
        message: "Store created successfully",
        storeid,
      };
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.errors);
      return { status: 400, message: "Invalid fields" };
    }
    console.error("Save Error:", err);
    return { status: 500, message: "Server error" };
  }
}
