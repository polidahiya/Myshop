"use server";
import Verification from "@/lib/verification";
import { getcollection } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";

export async function Getuserdata() {
  try {
    const tokenres = await Verification("public");
    if (!tokenres?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    return unstable_cache(
      async () => {
        const { userscollection } = await getcollection();

        const user = await userscollection.findOne(
          { email: tokenres.email },
          { projection: { password: 0 } }
        );
        user._id = user._id.toString();
        user.savedproducts = user.savedproducts.map((id) => id.toString());
        user.savedstores = user.savedstores.map((id) => id.toString());
        return user;
      },
      [`userdata-${tokenres.email}`],
      {
        revalidate: CACHE_TIME,
        tags: [`userdata-${tokenres.email}`],
      }
    )();
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Server Error" };
  }
}
