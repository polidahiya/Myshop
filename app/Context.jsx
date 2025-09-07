"use client";
import Cookies from "js-cookie";
import { createContext, useContext, useState, useRef, useEffect } from "react";

const AppContext = createContext({});

export function Appwrapper({ children, parsedCart }) {
  const [cart, setcart] = useState(parsedCart || {});
  const [messagearray, setmessagearray] = useState([]);
  const [showsidemenu, setshowsidemenu] = useState(false);
  const [openfilter, setopenfilter] = useState(false);

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

  const isoverlay = showsidemenu || showdialog.show || openfilter;
  return (
    <AppContext.Provider
      value={{
        cart,
        setcart,
        messagearray,
        setmessagearray,
        setmessagefn,
        showsidemenu,
        setshowsidemenu,
        openfilter,
        setopenfilter,
      }}
    >
      {/* <div className={`${isoverlay && "overflow-hidden h-dvh lg:overflow-auto lg:h-auto"}`}> */}
      {children}
      {/* </div> */}
    </AppContext.Provider>
  );
}

export function AppContextfn() {
  return useContext(AppContext);
}
