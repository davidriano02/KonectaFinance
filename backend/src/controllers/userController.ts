import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const getValidatedUserId = (req: Request, res: Response): number | null => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid id" });
        return null;
    }
    return id;
};


export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, userType } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, userType });
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Error creating user" });
    }
};


export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = getValidatedUserId(req, res);
        if (!id) return;

        const user = await User.findOne({ where: { id } });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;  // 🔹 IMPORTANTE: Evita que la ejecución continúe
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Error fetching user" });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = getValidatedUserId(req, res);
        if (!id) return;

        const [updated] = await User.update(req.body, { where: { id } });

        if (updated === 0) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Error updating user" });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = getValidatedUserId(req, res);
        if (!id) return;

        const deleted = await User.destroy({ where: { id } });

        if (!deleted) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Error deleting user" });
    }
};
