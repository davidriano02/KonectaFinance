import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};


interface UserPayload {
    id: number;
    userType: "Administrator" | "Advisor";
}

export const generateToken = (user: UserPayload): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.sign(
        { id: user.id, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};
