import { MongoClient, ServerApiVersion } from "mongodb";

class DatabaseConfig {
    public client: MongoClient
    private URI = process.env.DATABASE_URL ?? "";
    private dbUser = process.env.DB_USER ?? "";

    constructor() {
        this.client = new MongoClient(this.URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        })
    }

    async connect() {
        try {
            await this.client.connect()
            await this.client.db(this.dbUser).command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } catch (error) {
            console.log("Error connecting to DB", error);
        }
    }

        getDb() {
        return this.client.db(this.dbUser);
    }

}

export default new DatabaseConfig()