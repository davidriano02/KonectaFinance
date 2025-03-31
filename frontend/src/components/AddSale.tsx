import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Link } from "react-router-dom";

const UddUser = () => {
    return (
        <Card sx={{ p: 3, textAlign: "center", borderRadius: 3, boxShadow: 3, bgcolor: "primary.main", color: "white" }}>
            <CardContent>
                <Box display="flex" justifyContent="center" mb={2}>
                    <MonetizationOnOutlinedIcon fontSize="large" />
                </Box>
                <Typography variant="h5">Agregar Venta</Typography>
                <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                    ¿Deseas Ingresar una nueva venta?.
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/register"
                    sx={{ fontWeight: "bold" }}
                >
                    Agregar Venta
                </Button>
            </CardContent>
        </Card>
    );
};

export default UddUser;
