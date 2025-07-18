const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

let usersCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("todolistdb");
    usersCollection = db.collection("users");
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

function getUsersCollection() {
  if (!usersCollection) {
    throw new Error("MongoDB not connected");
  }
  return usersCollection;
}

module.exports = {
  connectDB,
  getUsersCollection,
};
