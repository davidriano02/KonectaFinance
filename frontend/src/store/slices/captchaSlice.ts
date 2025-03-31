import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface CaptchaState {
    captchaId: string | null;
    captchaImage: string | null;
    captchaText: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: CaptchaState = {
    captchaId: null,
    captchaImage: null,
    captchaText: null,
    loading: false,
    error: null,
};


export const fetchCaptcha = createAsyncThunk(
    "captcha/fetchCaptcha",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/captcha/generate`, { method: "GET" });
            if (!response.ok) {
                throw new Error("Error al obtener el captcha");
            }
            const data = await response.json();
            return data;  // { captchaId, image }
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Error desconocido");
        }
    }
);


export const validateCaptcha = createAsyncThunk(
    "captcha/validateCaptcha",
    async (captchaData: { captchaId: string; captchaText: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/api/captcha/validate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(captchaData),
            });

            if (!response.ok) {
                throw new Error("Captcha incorrecto");
            }
            return await response.json();  // { success: true }
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Error desconocido");
        }
    }
);

const captchaSlice = createSlice({
    name: "captcha",
    initialState,
    reducers: {
        setCaptchaData: (state, action: PayloadAction<{ captchaId: string; captchaText: string }>) => {
            state.captchaId = action.payload.captchaId;
            state.captchaText = action.payload.captchaText;
        },
        clearCaptchaData: (state) => {
            state.captchaId = null;
            state.captchaImage = null;
            state.captchaText = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCaptcha.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCaptcha.fulfilled, (state, action) => {
                state.loading = false;
                state.captchaId = action.payload.captchaId;
                state.captchaImage = action.payload.image;
                state.captchaText = "";
            })
            .addCase(fetchCaptcha.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(validateCaptcha.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(validateCaptcha.fulfilled, (state) => {
                state.loading = false;
                state.captchaId = null;
                state.captchaImage = null;
                state.captchaText = null;
            })
            .addCase(validateCaptcha.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCaptchaData, clearCaptchaData } = captchaSlice.actions;

export const selectCaptcha = (state: RootState) => state.captcha;

export default captchaSlice.reducer;
