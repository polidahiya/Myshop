"use client";
import { createContext, useContext, useState } from "react";

const Storehomectx = createContext({});

export function Storehomectxwrapper({ children }) {
  const [edit, setedit] = useState(false);
  return (
    <Storehomectx.Provider value={{ edit, setedit }}>
      {children}
    </Storehomectx.Provider>
  );
}

export function Storehomectxfn() {
  return useContext(Storehomectx);
}
