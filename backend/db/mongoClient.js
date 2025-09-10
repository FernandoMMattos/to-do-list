import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
let client;
let usersCollection;

export async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    const db = client.db("todolistdb");
    usersCollection = db.collection("users");
  }
  return usersCollection;
}

export function getUsersCollection() {
  if (!usersCollection)
    throw new Error("MongoDB not connected. Call connectDB() first.");
  return usersCollection;
}
