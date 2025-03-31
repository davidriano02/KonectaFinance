import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { User } from "../table/EnhancedTable";
import { MenuItem } from "@mui/material";
import React from "react";

interface EditUserModalProps {
    open: boolean;
    user: User | null;
    onClose: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: (user: User) => void;
}

const EditUserModal = ({ open, user, onClose, onChange, onSave }: EditUserModalProps) => {
    if (!user) return null;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nombre"
                    name="name"
                    value={user.name}
                    onChange={onChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={user.email}
                    onChange={onChange}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    select
                    label="Rol"
                    name="userType"
                    value={user.userType}
                    onChange={onChange}
                    fullWidth
                    margin="dense"
                >
                    <MenuItem value="Administrator">Administrator</MenuItem>
                    <MenuItem value="Advisor">Advisor</MenuItem>
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={() => onSave(user)} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserModal;
