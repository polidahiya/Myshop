"use client";
import { createContext, useContext, useState } from "react";
import { Updatehome } from "./Serveraction";
import { useRouter } from "next/navigation";
import { AppContextfn } from "@/app/Context";
import { Deleteimages } from "@/lib/Addordeleteimages";

const Edithomectx = createContext({});

export function Edithomectxwrapper({
  children,
  initialdata,
  add,
  at,
  storeid,
}) {
  const router = useRouter();
  const { setmessagefn, newadded, setnewadded } = AppContextfn();

  const [data, setdata] = useState(initialdata);
  const [loading, setloading] = useState(false);
  const [deletedimages, setdeletedimages] = useState([]);
  const Submitform = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await Updatehome(data, add, at, deletedimages);

      setmessagefn(res?.message);
      setloading(false);

      if (res.status == 200) {
        setdeletedimages([]);
        setnewadded([]);
        router.replace(`/${storeid}`);
      }
    } catch (error) {
      setloading(false);
      setmessagefn("Error!");
      console.error("Error:", error);
    }
  };
  return (
    <Edithomectx.Provider
      value={{
        data,
        setdata,
        loading,
        setloading,
        deletedimages,
        setdeletedimages,
        newadded,
        setnewadded,
      }}
    >
      <form onSubmit={Submitform} className="pb-10">
        <h4 className="font-medium mb-2 text-3xl px-2 md:px-10 mt-5">
          {initialdata?.category}
        </h4>
        {children}
        <div className="flex items-center justify-center gap-2 mt-5">
          <button
            type="submit"
            className="px-5 py-1 border border-theme rounded-md bg-theme text-white"
          >
            Save
          </button>
          <button
            type="button"
            className="px-5 py-1 border rounded-md"
            onClick={async () => {
              if (newadded.length > 0) {
                setmessagefn("Cleaning up...");
                await Deleteimages(newadded, "Mystore");
              }
              window.history.back();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </Edithomectx.Provider>
  );
}

export function Edithomectxfn() {
  return useContext(Edithomectx);
}
