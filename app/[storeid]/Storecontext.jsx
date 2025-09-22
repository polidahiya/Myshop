"use client";
import { createContext, useContext, useState } from "react";

const Storehomectx = createContext({});

export function Storehomectxwrapper({ children }) {
  const [edit, setedit] = useState(false);
  const [addmenu, setaddmenu] = useState({
    show: false,
    addat: 0,
  });
  return (
    <Storehomectx.Provider value={{ edit, setedit, addmenu, setaddmenu }}>
      {children}
    </Storehomectx.Provider>
  );
}

export function Storehomectxfn() {
  return useContext(Storehomectx);
}
