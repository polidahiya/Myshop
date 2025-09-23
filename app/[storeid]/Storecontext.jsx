"use client";
import { createContext, useContext, useState } from "react";

const Storehomectx = createContext({});

export function Storehomectxwrapper({ children }) {
  const [edit, setedit] = useState(false);
  const [addmenu, setaddmenu] = useState({
    show: false,
    addat: 0,
  });
  const [thememenu, setthememenu] = useState({
    show: false,
    data: {},
    at: 0,
  });
  return (
    <Storehomectx.Provider
      value={{ edit, setedit, addmenu, setaddmenu, thememenu, setthememenu }}
    >
      {children}
    </Storehomectx.Provider>
  );
}

export function Storehomectxfn() {
  return useContext(Storehomectx);
}
