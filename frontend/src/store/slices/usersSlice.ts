import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { User } from "../../components/table/EnhancedTable";

const API_URL = import.meta.env.VITE_API_URL;

interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};


export const fetchUsers = createAsyncThunk<User[]>(
    "users/fetchUsers",
    async () => {
        const response = await axios.get<User[]>(`${API_URL}/api/users`);
        console.log("Datos obtenidos de la API:", response.data);


        return response.data.map(user => ({
            ...user,
            id: user.id,
        }));
    }
);


export const updateUserThunk = createAsyncThunk<User, User>(
    "users/updateUser",
    async (userData) => {
        const response = await axios.put<User>(`${API_URL}/api/users/${userData.id}`, userData);
        return response.data;
    }
);


export const deleteUserThunk = createAsyncThunk<string | number, string | number>(
    "users/deleteUser",
    async (userId) => {
        await axios.delete(`${API_URL}/api/users/${userId}`);
        return userId;
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

        addUser: (state, action: PayloadAction<User>) => {
            state.users.push({ ...action.payload, id: action.payload.id });
        },
        removeUser: (state, action: PayloadAction<string | number>) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error al cargar los usuarios";
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(deleteUserThunk.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            });
    }
});


export const { addUser, removeUser } = usersSlice.actions;


export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
