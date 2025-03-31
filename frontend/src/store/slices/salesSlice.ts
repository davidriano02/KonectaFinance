import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { Sale } from "../../components/table/EnhancedTable";

interface SalesState {
    sales: Sale[];
    loading: boolean;
    error: string | null;
}

const initialState: SalesState = {
    sales: [],
    loading: false,
    error: null,
};


export const fetchSales = createAsyncThunk("sales/fetchSales", async (_, { getState }) => {
    const state = getState() as RootState;
    const apiUrl = state.api.apiUrl;
    const response = await axios.get(`${apiUrl}/api/sales`);
    return response.data;
});


export const updateSaleThunk = createAsyncThunk(
    "sales/updateSale",
    async (saleData: Sale, { getState }) => {
        const state = getState() as RootState;
        const apiUrl = state.api.apiUrl;
        const response = await axios.put(`${apiUrl}/api/sales/${saleData.id}`, saleData);
        return response.data;
    }
);


export const removeSaleThunk = createAsyncThunk(
    "sales/removeSale",
    async (saleId: string, { getState }) => {
        const state = getState() as RootState;
        const apiUrl = state.api.apiUrl;
        await axios.delete(`${apiUrl}/api/sales/${saleId}`);
        return saleId;
    }
);

const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSales.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSales.fulfilled, (state, action) => {
                state.loading = false;
                state.sales = action.payload;
            })
            .addCase(fetchSales.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error al cargar las ventas";
            })
            .addCase(updateSaleThunk.fulfilled, (state, action) => {
                const index = state.sales.findIndex(sale => sale.id === action.payload.id);
                if (index !== -1) {
                    state.sales[index] = action.payload;
                }
            })
            .addCase(removeSaleThunk.fulfilled, (state, action) => {
                state.sales = state.sales.filter(sale => sale.id !== action.payload);
            });
    },
});

export const selectSales = (state: RootState) => state.sales.sales;
export default salesSlice.reducer;
