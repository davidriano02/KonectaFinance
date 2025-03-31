import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { Sale } from "../table/EnhancedTable";

interface EditSaleModalProps {
    open: boolean;
    sale: Sale | null;
    onClose: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
}

const EditSaleModal: React.FC<EditSaleModalProps> = ({ open, sale, onClose, onChange, onSave }) => {
    const [isCreditCard, setIsCreditCard] = useState(false);


    useEffect(() => {
        if (!sale) return;

        const isCredit = sale.product === "Credit Card";
        setIsCreditCard(isCredit);
    }, [sale]);


    if (!sale) return null;
    const formatDateForInput = (dateValue: string | number | Date): string => {
        if (!dateValue) return "";
        const date = new Date(typeof dateValue === "number" ? dateValue * 1000 : dateValue);
        return date.toISOString().slice(0, 16);
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Editar Venta</DialogTitle>
            <DialogContent>
                <TextField
                    select
                    label="Producto"
                    name="product"
                    value={sale.product}
                    onChange={onChange}
                    required
                    fullWidth
                >
                    <MenuItem value="Consumer Credit">Consumer Credit</MenuItem>
                    <MenuItem value="Payroll Loan">Payroll Loan</MenuItem>
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                </TextField>


                <TextField
                    label="Cupo Solicitado"
                    name="requested_quota"
                    value={sale.requested_quota}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{ maxLength: 20 }}
                />

                <TextField
                    label="Tasa"
                    name="rate"
                    value={sale.rate}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{ maxLength: 4 }}
                />

                {isCreditCard && (
                    <TextField
                        select
                        label="Franquicia"
                        name="franchise"
                        value={sale.franchise}
                        onChange={onChange}
                        required
                    >
                        <MenuItem value="AMEX">AMEX</MenuItem>
                        <MenuItem value="VISA">VISA</MenuItem>
                        <MenuItem value="MASTERCARD">MASTERCARD</MenuItem>
                    </TextField>
                )}


                <TextField
                    label="Fecha de Creación"
                    name="createdAt"
                    type="datetime-local"
                    value={formatDateForInput(sale.createdAt)}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                    required
                    InputLabelProps={{ shrink: true }}
                    disabled
                />


                <TextField
                    label="Usuario que crea"
                    name="id"
                    value={sale.userId}
                    onChange={onChange}
                    fullWidth
                    margin="normal"
                    required
                    disabled
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancelar</Button>
                <Button onClick={onSave} color="primary" variant="contained">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditSaleModal;
