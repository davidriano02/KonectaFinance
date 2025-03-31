import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export interface Sale {
    id: number | string;
    product: "Consumer Credit" | "Payroll Loan" | "Credit Card";
    requested_quota: string;
    franchise?: "AMEX" | "VISA" | "MASTERCARD";
    rate?: string;
    createdAt: string | number;
    userId: number;
    updatedAt: string | number;
    updatedBy: number;
    seller: string;
}


export interface User {
    id: number | string;
    email: string;
    name: string;
    userType: string;
    isLoggedIn: boolean;
}

interface EnhancedTableProps<T extends { id: number | string }> {
    columns: GridColDef[];
    rows: T[];
    loading: boolean;
    onEdit?: (row: T) => void;
    onDelete?: (id: string | number) => void;
}

const EnhancedTable = <T extends { id: number | string }>({ columns, rows, loading, onEdit, onDelete }: EnhancedTableProps<T>) => {
    const actionColumn: GridColDef = {
        field: "actions",
        headerName: "Acciones",
        width: 150,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
            <>
                {onEdit && (
                    <IconButton onClick={() => onEdit(params.row)} color="primary">
                        <EditIcon />
                    </IconButton>
                )}
                {onDelete && (
                    <IconButton onClick={() => onDelete(params.row.id)} color="error">
                        <DeleteIcon />
                    </IconButton>
                )}
            </>
        ),
    };

    const finalColumns = [...columns, actionColumn];

    return (
        <Box sx={{ height: 520, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {loading ? (
                <CircularProgress sx={{ display: "block", margin: "auto" }} />
            ) : (
                <DataGrid
                    rows={rows}
                    columns={finalColumns}
                    pageSizeOptions={[5, 10, 25, 100]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    slots={{ toolbar: GridToolbar }}
                />
            )}
        </Box>
    );
};

export default EnhancedTable;
