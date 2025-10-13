"use client";
import { createContext, useContext, useEffect, useState } from "react";

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
  const [installprompt, setinstallprompt] = useState(null);
  const [installvisiable, setinstallvisiable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setinstallprompt(e);
      setinstallvisiable(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);
  return (
    <Storehomectx.Provider
      value={{
        edit,
        setedit,
        addmenu,
        setaddmenu,
        thememenu,
        setthememenu,
        installprompt,
        setinstallprompt,
        installvisiable,
        setinstallvisiable,
      }}
    >
      {children}
    </Storehomectx.Provider>
  );
}

export function Storehomectxfn() {
  return useContext(Storehomectx);
}
