"use client";
import Options from "./Options";
import Cartbutton from "./Cartbutton";
import Descriptionitem from "./Descriptionitem";
import Sharebutton from "./Sharebutton";
import Pricedisplay from "./Pricedisplay";

function Details({ product, whatsappnum }) {
  return (
    <div className="min-h-28 px-5 md:px-0">
      {/* name */}
      <h1 className="text-3xl font-tenor ">{product?.name}</h1>
      <Sharebutton
        sku={product?.sku}
        description={product?.keyfeatures.join("________")}
        image={product?.images[0]}
      />
      <Pricedisplay />
      <Options options={product?.options} />
      {/* descriptions */}
      <div className="mt-10">
        {product?.keyfeatures && product?.keyfeatures.length > 0 && (
          <Descriptionitem
            heading="Key Features"
            details={product?.keyfeatures}
            preopen={true}
          />
        )}
        {product?.descriptions && product?.descriptions.length > 0 && (
          <Descriptionitem
            heading="Description"
            details={product?.descriptions}
            preopen={true}
          />
        )}
      </div>
      <Cartbutton product={product} whatsappnum={whatsappnum}/>
    </div>
  );
}

export default Details;
