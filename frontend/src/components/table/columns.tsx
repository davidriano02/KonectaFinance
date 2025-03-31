import { GridColDef } from "@mui/x-data-grid";

export const salesColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "product", headerName: "Producto", width: 150 },
    { field: "requested_quota", headerName: "Cuota Solicitada", width: 150 },
    { field: "franchise", headerName: "Franquicia", width: 150 },
    { field: "rate", headerName: "Tasa", width: 120 },
    { field: "userId", headerName: "Usuario", width: 120 },
    { field: "createdAt", headerName: "Fecha Creación", width: 180 }
];
export const usersColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "userType", headerName: "Rol", width: 120 },
];
