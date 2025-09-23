export default function Linkgenerator(item, storeid) {
  const linktype = item?.link?.type;
  let link = "";
  if (linktype == "collections") {
    const cdata = item?.link?.collection;
    link = `/${storeid}/collections/?${cdata[0]}=${cdata[1]}`;
  } else if (linktype == "product") {
    const pid = item?.link?.id;
    link = `/${storeid}/product/${pid}`;
  }
  return link;
}
