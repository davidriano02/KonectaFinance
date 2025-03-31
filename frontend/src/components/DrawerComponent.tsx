import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import DrawerNavigation from "./DrawerNavigation";

const drawerWidth = 240;

interface DrawerProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    isMobile: boolean;
}

const DrawerComponent: React.FC<DrawerProps> = ({ mobileOpen, handleDrawerToggle, isMobile }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            sx={{
                width: collapsed ? 64 : drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: collapsed ? 64 : drawerWidth,
                    boxSizing: "border-box",
                    top: 64,
                    transition: "width 0.3s ease-in-out",
                },
            }}
        >
            <IconButton onClick={toggleCollapse} sx={{ margin: 1 }}>
                <MenuIcon />
            </IconButton>
            <DrawerNavigation />
        </Drawer>
    );
};

export default DrawerComponent;
