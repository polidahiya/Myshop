"use client";
import { createContext, useContext, useState } from "react";

const Productcontext = createContext({});

export function Productctxwrapper({ children, product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setquantity] = useState(1);
  const [selectedoptions, setselectedoptions] = useState(
    new Array(product?.options?.length).fill(0) || []
  );

  let finalprice = Number(product?.price) * quantity;
  let finalmrp = Number(product?.mrp) * quantity;
  product?.options?.forEach((opt, i) => {
    const selectedoption = opt?.options[selectedoptions[i] || 0];
    finalprice += Number(selectedoption?.price);
    finalmrp += Number(selectedoption?.mrp);
  });

  return (
    <Productcontext.Provider
      value={{
        selectedImageIndex,
        setSelectedImageIndex,
        quantity,
        setquantity,
        selectedoptions,
        setselectedoptions,
        finalprice,
        finalmrp,
      }}
    >
      {children}
    </Productcontext.Provider>
  );
}

export function Productctxfn() {
  return useContext(Productcontext);
}
