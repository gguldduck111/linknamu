import { MongoClient } from "mongodb";

let connection: Promise<MongoClient> | undefined;

export async function getDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!connection) {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    connection = client.connect().catch((error: unknown) => {
      connection = undefined;
      throw error;
    });
  }
  const client = await connection;
  return client.db(process.env.MONGODB_DB || "linknamu");
}
