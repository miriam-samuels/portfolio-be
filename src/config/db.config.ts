import { MongoClient, Db, ServerApiVersion } from "mongodb";

class DatabaseConfig {
  private client: MongoClient;
  private dbName = process.env.DB_NAME ?? "";
  private isConnected = false;

  constructor() {
    const URI = process.env.DATABASE_URL ?? "";
    this.client = new MongoClient(URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await this.client.connect();
        await this.client.db(this.dbName).command({ ping: 1 });
        console.log("✅ Connected to MongoDB");
        this.isConnected = true;
      } catch (error) {
        console.error("❌ Error connecting to DB", error);
        throw error;
      }
    }
  }

  getDb(): Db {
    if (!this.isConnected) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.client.db(this.dbName);
  }
}

export default new DatabaseConfig();
