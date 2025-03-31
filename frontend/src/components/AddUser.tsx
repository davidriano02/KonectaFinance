import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { Link } from "react-router-dom";

const AddUser = () => {
    return (
        <Card sx={{ p: 3, textAlign: "center", borderRadius: 3, boxShadow: 3, bgcolor: "primary.main", color: "white" }}>
            <CardContent>
                <Box display="flex" justifyContent="center" mb={2}>
                    <PersonAdd fontSize="large" />
                </Box>
                <Typography variant="h5">Agregar Usuario</Typography>
                <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                    ¿Deseas Agregar Un nuevo Usuario.
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/register"
                    sx={{ fontWeight: "bold" }}
                >
                    Agregar Usuario
                </Button>
            </CardContent>
        </Card>
    );
};

export default AddUser;
