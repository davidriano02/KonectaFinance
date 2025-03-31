import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";



interface User {
    id: string;
    email: string;
    userType: "Administrator" | "Advisor";
}

interface AuthState {
    user: User | null;
    token: string | null;
}

const initialState: AuthState = { user: null, token: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        restoreSession: (state) => {
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            console.log("Restaurando sesión desde localStorage:", { token, user });
            if (token && user) {
                state.token = token;
                state.user = JSON.parse(user);
            }
        }
    }
});


export const selectAuthUser = (state: RootState): User | null => state.auth.user;

export const { loginSuccess, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
