import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { logout } from "../store/slices/authSlice";

interface ErrorPayload {
    message: string;
}

export const authMiddleware: Middleware = (store) => (next) => (action) => {
    if (isRejectedWithValue(action) && (action.payload as ErrorPayload)?.message === "Unauthorized") {
        store.dispatch(logout());
    }
    return next(action);
};
