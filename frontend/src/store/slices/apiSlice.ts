import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;  // Tomando de .env

interface ApiState {
    apiUrl: string;
}

const initialState: ApiState = {
    apiUrl: API_URL || "http://localhost:3001",  // URL por defecto
};

const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        setApiUrl: (state, action: PayloadAction<string>) => {
            state.apiUrl = action.payload;
        },
    },
});

export const { setApiUrl } = apiSlice.actions;
export default apiSlice.reducer;
