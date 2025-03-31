import { Box, CssBaseline, Container, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import AddUser from "../components/AddUser.tsx";
import React from "react";
import AddSale from "../components/AddSale.tsx";

const AdminLayout: React.FC = () => {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default", overflow: "hidden" }}>
            <CssBaseline />
            <Outlet />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 3,
                    mt: 8,
                    overflow: "auto",
                    height: "100vh"
                }}
            >
                <Container maxWidth="md">
                    <Grid container spacing={3} justifyContent="center">

                        <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex", justifyContent: "center", maxWidth: "100%" }}>
                            <Box sx={{ maxWidth: 300, width: "100%" }}>
                                <AddUser />
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex", justifyContent: "center", maxWidth: "100%" }}>
                            <Box sx={{ maxWidth: 300, width: "100%" }}>
                                <AddUser />
                            </Box>
                        </Grid>


                        <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex", justifyContent: "center", maxWidth: "100%" }}>
                            <Box sx={{ maxWidth: 300, width: "100%" }}>
                                <AddSale />
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex", justifyContent: "center", maxWidth: "100%" }}>
                            <Box sx={{ maxWidth: 300, width: "100%" }}>
                                <AddSale />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default AdminLayout;
