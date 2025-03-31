import express, { Application } from "express";
import cors from "cors";
import userRoutes from "../routes/userRoutes";
import saleRoutes from "../routes/saleRoutes";
import authRoutes from "../routes/authRoutes";
import captchaRoutes from "../routes/captcha";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/captcha", captchaRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});