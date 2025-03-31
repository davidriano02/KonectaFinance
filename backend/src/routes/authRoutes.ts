import express from "express";
import { register, login } from "../controllers/authController";
import { validateUser } from "../middlewares/validators";

const router = express.Router();

router.post("/register", validateUser, register);
router.post("/login", validateUser, login);

export default router;
