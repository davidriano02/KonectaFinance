import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;


interface DecodedToken {
    id: string;
    email?: string;
    userType: "Administrator" | "Advisor";
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });

        console.log("📌 Respuesta completa de la API:", response.data);

        if (!response.data || !response.data.token) {
            throw new Error("Datos inválidos recibidos del servidor");
        }


        const decodedToken = jwtDecode<DecodedToken>(response.data.token);


        const user = {
            id: decodedToken.id,
            email: decodedToken.email || "",
            userType: decodedToken.userType
        };

        return { token: response.data.token, user };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("❌ Error en la petición de login:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error al intentar iniciar sesión");
        }
        throw new Error("Error desconocido al iniciar sesión");
    }
};
export default DecodedToken