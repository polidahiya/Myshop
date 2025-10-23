import Verification from "./verification";

export async function Authfn(storeid) {
  try {
    const res = await Verification("public");
    return {
      ...res,
      isadmin:
        res.verified && (res.storeid == storeid || res.usertype == "admin"),
    };
  } catch (error) {
    console.log(error);
    return {
      verified: false,
      email: "Email not found",
      usertype: "user",
      storeid: null,
      isadmin: false,
    };
  }
}
