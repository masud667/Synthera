import { MongoClient, ServerApiVersion } from "mongodb";

let client;
let db;

export const connectDB = async () => {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Please define MONGO_URI in .env.local");

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  // Use the database defined in your URI
  const dbName = new URL(uri).pathname.substring(1); // takes database name from URI
  db = client.db(dbName);
  console.log("Connected to MongoDB:", db.databaseName);
  return db;
};
