"use client";
import Options from "./Options";
import Cartbutton from "./Cartbutton";
import Descriptionitem from "./Descriptionitem";
import Sharebutton from "./Sharebutton";
import Pincodecomp from "./Pincodecomp";
import Pricedisplay from "./_commentcomp/Pricedisplay";
import { AppContextfn } from "@/app/Context";
import { useState, useEffect } from "react";

function Details({
  product,
  productid,
  cartproductname,
  allsearchparams,
  rawprice,
  rawmrp,
  quickview = false,
}) {
  const { cart, setcart } = AppContextfn();
  const [pincode, setpincode] = useState("");
  const [pincodemsg, setpincodemsg] = useState(null);

  useEffect(() => {
    setcart((pre) => {
      let updateddata = { ...pre };
      if (!quickview)
        updateddata = Object.fromEntries(
          Object.entries(updateddata).filter(
            ([key, value]) => value.added || key == cartproductname
          )
        );

      if (!updateddata[cartproductname]?.added) {
        updateddata[cartproductname] = {
          added: false,
          quantity: 1,
        };
      }

      return updateddata;
    });
  }, [cartproductname]);

  useEffect(() => {
    // local storage pin storage
    const pin = localStorage.getItem("pin");
    if (pin) {
      setpincode(pin);
      setpincodemsg({
        status: 200,
        message: "Available at this pincode",
      });
    }
  }, []);
  console.log(cart, cartproductname);

  const currentproduct = cart[cartproductname] || {};

  let finalprice = rawprice * (currentproduct?.quantity || 1);
  let finalmrp = rawmrp * (currentproduct?.quantity || 1);
  console.log(product);
  
  return (
    <div className="min-h-28 px-5 md:px-0">
      {/* name */}
      <h1 className="text-3xl font-tenor ">{product?.name}</h1>
      <Sharebutton
        sku={product?.sku}
        description={product?.keyfeatures.join("________")}
        image={product?.images[0]}
      />
      <Pricedisplay finalprice={finalprice} finalmrp={finalmrp} />
      <hr className="my-5 border border-gray-200" />
      <Options
        options={product?.options}
        allsearchparams={allsearchparams}
        productid={productid}
      />
      <hr className="my-5 border border-gray-200" />
      <Pincodecomp
        pincode={pincode}
        setpincode={setpincode}
        pincodemsg={pincodemsg}
        setpincodemsg={setpincodemsg}
      />

      {/* descriptions */}
      <div className="mt-10">
        <Descriptionitem
          heading="Key Features"
          details={product?.keyfeatures}
        />
        <Descriptionitem
          heading="Description"
          details={product?.descriptions}
        />
        <Descriptionitem
          heading="Care & Maintenance"
          details={[
            "You've put a lot of care into choosing your furnishings. And with continued care at home, they should share your address for many years to come. Now for your owner's manual...",
            "Color and natural veining will vary with each piece.",
            "Dust with soft dry cloth.",
            "Do not use abrasive cleaners.",
            "Do not leave spills unattended.",
            "Wipe with soft cloth.",
            "Use of coasters is recommended.",
            "MARBLE/STONE is a porous, natural material and prone to stains.",
            "Wipe spills immediately to reduce staining and water marks.",
          ]}
          firstisdesc={true}
        />
      </div>
      <Cartbutton
        product={product}
        cartproductname={cartproductname}
        finalprice={finalprice}
        finalmrp={finalmrp}
      />
    </div>
  );
}

export default Details;
