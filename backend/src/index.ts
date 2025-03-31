import "dotenv/config";
import { sequelize } from "./config/db";
import "./config/server";

const startApp = async (): Promise<void> => {
    try {
        await sequelize.sync();
        console.log("📌 Database connected successfully");
    } catch (err) {
        console.error("❌ Error connecting to the database:", err);
        process.exit(1);
    }
};

startApp();
