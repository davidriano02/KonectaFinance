import { Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBarComponent from "../components/AppBarComponent";
import DrawerComponent from "../components/DrawerComponent";
import React from "react";

const DashboardLayout: React.FC = () => {
    return (

        <Box sx={{ display: "flex", bgcolor: "background.default", minHeight: "100vh" }}>
            <AppBarComponent title="Dashboard" />
            <DrawerComponent mobileOpen={false} handleDrawerToggle={() => {}} isMobile={false} />
            <Box component="main" sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", p: 3, mt: 8 }}>
                <Container maxWidth="md">
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default DashboardLayout;