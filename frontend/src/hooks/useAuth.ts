import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice.ts";
import { login } from "../api/auth.ts";

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await login(email, password);
            const { token, user } = response;

            if (!user || !user.userType) {
                throw new Error("Datos inválidos recibidos del servidor");
            }

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(loginSuccess({ user, token }));
            navigate("/redirect");
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            alert("Credenciales incorrectas o error en el servidor");
        } finally {
            setLoading(false);
        }
    };

    return {
        handleLogin,
        loading,
    };
};

export default useAuth;
