"use client";
import Cookies from "js-cookie";
import { createContext, useContext, useState, useRef, useEffect } from "react";

const AppContext = createContext({});

export function Appwrapper({ children, token, userdata, parsedCart }) {
  const [cart, setcart] = useState(parsedCart || {});
  const [messagearray, setmessagearray] = useState([]);
  const showdialoginitialvalues = {
    show: false,
    title: "",
    continue: null,
    type: true,
  };
  const [showdialog, setshowdialog] = useState(showdialoginitialvalues);

  // messages
  const setmessagefn = (message) => {
    setmessagearray([
      ...messagearray,
      { id: Math.random() + new Date().getMilliseconds(), message: message },
    ]);
  };

  //  update cookies when cart change
  useEffect(() => {
    if (cart && Object.keys(cart).length > 0) {
      Cookies.set("rentbeancart3", JSON.stringify(cart), { expires: 1 });
    } else {
      // Remove the cookie if the cart is empty
      Cookies.remove("rentbeancart3");
    }
  }, [cart]);

  return (
    <AppContext.Provider
      value={{ messagearray, setmessagearray, setmessagefn }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function AppContextfn() {
  return useContext(AppContext);
}
