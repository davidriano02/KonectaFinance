import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword, comparePassword, generateToken } from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, userType } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            res.status(400).json({ msg: "Email already in use." });
            return;
        }

        const hashedPassword = await hashPassword(password);
        await User.create({ name, email, password: hashedPassword, userType });
        res.status(201).json({ msg: "User registered successfully." });
    } catch (error) {
        res.status(500).json({ msg: "Error registering user", error });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await comparePassword(password, user.password))) {
            res.status(400).json({ msg: "Invalid credentials" });
            return;
        }

        const token = generateToken(user);
        res.json({ msg: "Login successful", token });
    } catch (error) {
        res.status(500).json({ msg: "Error logging in", error });
    }
};
