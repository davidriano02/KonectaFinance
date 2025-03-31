import { Box, CssBaseline, useMediaQuery, useTheme, Container } from "@mui/material";
//import { Outlet } from "react-router-dom";
import { useState } from "react";
import AppBarComponent from "../components/AppBarComponent";
import DrawerComponent from "../components/DrawerComponent";
import {Outlet} from "react-router-dom";

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
            <CssBaseline />
            <AppBarComponent title="Panel de Administración" onMenuClick={isMobile ? handleDrawerToggle : undefined} />
            <DrawerComponent mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} isMobile={isMobile} />

            <Box component="main" sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", p: 3, mt: 8 }}>
                <Container maxWidth="md">
                    <Outlet />
                </Container>

            </Box>

        </Box>
    );
};

export default Dashboard;
