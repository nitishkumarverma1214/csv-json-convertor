import { Sequelize } from "sequelize-typescript";
import { dbConfig } from "./config"; // (Optional if using env-based config later)
import { User } from "./model/user.model";

export class Database {
  private static instance: Sequelize;

  public static getInstance(): Sequelize {
    if (!this.instance) {
      throw new Error("Database not connected. Call Database.connect() first.");
    }
    return this.instance;
  }

  public static async connect(): Promise<Sequelize> {
    if (!this.instance) {
      this.instance = new Sequelize({
        dialect: "postgres",
        username: dbConfig.username,
        password: dbConfig.password,
        host: dbConfig.host,
        port: dbConfig.port,
        // storage: "./data/sqlite/database.sqlite",
        models: [User],
        logging: false,
      });

      try {
        await this.instance.authenticate();
        await this.instance.sync(); // Ensures tables are created
        console.log("Database connected and synced.");
      } catch (error) {
        console.error("Failed to connect to database:", error);
        throw error;
      }
    }

    return this.instance;
  }
}
