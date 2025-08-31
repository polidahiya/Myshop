import { MongoClient, ObjectId } from "mongodb";

const dbLink = process.env.mongodb_link;
const client = new MongoClient(dbLink, { serverSelectionTimeoutMS: 10000 });

let db;
let collections;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db("mystore");

    collections = {
      sitedata: db.collection("data"),
      storescollection: db.collection("stores"),
      Productscollection: db.collection("Products"),
      userscollection: db.collection("users"),
      orderscollection: db.collection("orders"),
      contactmessages: db.collection("contactmessages"),
      coupons: db.collection("coupons"),
    };
  }

  return collections;
}

export async function getcollection() {
  await connectToDatabase();
  return { ...collections, ObjectId };
}
