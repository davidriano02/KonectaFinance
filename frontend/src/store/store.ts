import { configureStore } from "@reduxjs/toolkit";
import authReducer, {restoreSession} from "./slices/authSlice";
import salesReducer from "./slices/salesSlice";
import usersReducer from "./slices/usersSlice";
import { authMiddleware } from "../middlewares/authMiddleware";
import captchaReducer from "./slices/captchaSlice";
import apiReducer from "./slices/apiSlice"
import { useDispatch } from "react-redux";


export const store = configureStore({
    reducer: { auth: authReducer,
        api: apiReducer,
        sales: salesReducer,
        users: usersReducer,
        captcha: captchaReducer
    },


    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
});
store.dispatch(restoreSession());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
