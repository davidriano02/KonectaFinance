import { useState, useEffect } from "react";
import { User } from "../components/table/EnhancedTable";

export const useEditUser = (initialUser: User | null) => {
    const [editedUser, setEditedUser] = useState<User | null>(initialUser);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setEditedUser(initialUser);
        setOpen(!!initialUser); // Abre el modal si hay un usuario
    }, [initialUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editedUser) {
            setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
        }
    };

    const handleClose = () => {
        setOpen(false);
        setEditedUser(null);
    };

    return {
        editedUser,
        open,
        setOpen,
        handleChange,
        handleClose,
    };
};
