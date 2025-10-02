import React from "react";
import { getStoreData } from "../../Storedata";

async function Collections({ storeid, device, Component, compProps }) {
  const { collection } = compProps;
  const storedata = await getStoreData(storeid);
  const Selectedcollection = storedata?.collections.find(
    (item) => item?.name == collection
  );
  return (
    <div className="py-2 md:py-5">
      <Component
        storeid={storeid}
        device={device}
        {...compProps}
        Selectedcollection={Selectedcollection}
      />
    </div>
  );
}

export default Collections;
