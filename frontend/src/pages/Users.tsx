import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchUsers, updateUserThunk, selectUsers, deleteUserThunk} from "../store/slices/usersSlice";
import { RootState, AppDispatch } from "../store/store";
import EnhancedTable, { User } from "../components/table/EnhancedTable";
import { usersColumns } from "../components/table/columns";
import EditUserModal from "../components/users/EditUserModal";

const UserTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector(selectUsers);
    const loading = useSelector((state: RootState) => state.users.loading);


    const [open, setOpen] = useState(false);
    const [editedUser, setEditedUser] = useState<User | null>(null);

    useEffect(() => {
        if (users.length === 0) {
            dispatch(fetchUsers());
        }
    }, [dispatch, users.length]);


    const handleEdit = (user: User) => {
        setEditedUser(user);
        setOpen(true); // Abrir modal
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editedUser) return;

        const { name, value } = e.target;


        if (name === "userType" && value !== "Administrator" && value !== "Advisor") {
            return;
        }

        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    };


    const handleSave = () => {
        if (editedUser) {
            dispatch(updateUserThunk(editedUser)).then(() => {
                dispatch(fetchUsers());
            });
        }
        setOpen(false);
    };


    const handleDelete = async (id: string | number) => {
        try {
            await dispatch(deleteUserThunk(id.toString())).unwrap();
            dispatch(fetchUsers()); // 🔄 Refrescar la tabla después de eliminar
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };


    return (
        <>
            <EnhancedTable
                columns={usersColumns}
                rows={users}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            {editedUser && (
                <EditUserModal
                    open={open}
                    user={editedUser}
                    onClose={() => setOpen(false)}
                    onChange={handleChange}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default UserTable;
