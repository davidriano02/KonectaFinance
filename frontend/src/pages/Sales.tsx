import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales, selectSales, removeSaleThunk, updateSaleThunk } from "../store/slices/salesSlice";
import { fetchUsers, selectUsers } from "../store/slices/usersSlice";
import { RootState, AppDispatch } from "../store/store";
import EnhancedTable, { Sale } from "../components/table/EnhancedTable";
import { salesColumns } from "../components/table/columns";
import EditSaleModal from "../components/sales/EditSaleModal";

const SalesTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector(selectUsers);
    const sales = useSelector(selectSales);
    const loading = useSelector((state: RootState) => state.sales.loading);

    const [open, setOpen] = useState(false);
    const [editedSale, setEditedSale] = useState<Sale | null>(null);

    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsers());
        }
        if (sales.length === 0) {
            dispatch(fetchSales());
        }
    }, [dispatch, users.length, sales.length]);

    const currentUser = parsedUser
        ? users.find(user => user.id === parsedUser.id) || parsedUser
        : null;

    const filteredSales = currentUser
        ? currentUser.userType === "Advisor"
            ? sales.filter(sale => sale.userId === currentUser.id)
            : sales
        : sales;

    // ✏️ Editar venta
    const handleEdit = (sale: Sale) => {
        setEditedSale(sale);
        setOpen(true);
    };

    // 📝 Manejar cambios en el modal
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editedSale) return;
        const { name, value } = e.target;
        setEditedSale({ ...editedSale, [name]: value });
    };

    // ✅ Guardar cambios
    const handleSave = () => {
        if (editedSale) {
            dispatch(updateSaleThunk(editedSale)).then(() => {
                dispatch(fetchSales());
            });
        }
        setOpen(false);
    };

    // 🗑️ Eliminar venta
    const handleDelete = async (id: string | number) => {
        try {
            await dispatch(removeSaleThunk(id.toString())).unwrap();
            dispatch(fetchSales());
        } catch (error) {
            console.error("Error al eliminar venta:", error);
        }
    };

    return (
        <>
            <EnhancedTable
                columns={salesColumns}
                rows={filteredSales}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            {editedSale && (
                <EditSaleModal
                    open={open}
                    sale={editedSale}
                    onClose={() => setOpen(false)}
                    onChange={handleChange}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default SalesTable;
