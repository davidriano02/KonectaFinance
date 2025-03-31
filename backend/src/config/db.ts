import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    }
);

sequelize.authenticate()
    .then(() => console.log("✅ Conexión a MySQL establecida correctamente"))
    .catch(err => console.error("❌ Error de conexión a MySQL:", err));

export { sequelize };
