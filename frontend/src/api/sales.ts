import axios from "axios";
const SALES_API_URL = import.meta.env.VITE_API_URL;

export const fetchSales = async () => {
    const response = await axios.get(SALES_API_URL);
    return response.data;
};

export const createSale = async (saleData: any) => {
    const response = await axios.post(SALES_API_URL, saleData);
    return response.data;
};

export const updateSale = async (saleId: string, saleData: any) => {
    const response = await axios.put(`${SALES_API_URL}/${saleId}`, saleData);
    return response.data;
};

export const deleteSale = async (saleId: string) => {
    const response = await axios.delete(`${SALES_API_URL}/${saleId}`);
    return response.data;
};