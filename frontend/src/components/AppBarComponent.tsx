import { AppBar, Toolbar, Typography, IconButton, Badge, MenuItem, Menu, Box, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNavigation } from "../hooks/useNavigation.tsx"; // Importar el hook

const AppBarComponent: React.FC<{ title: string; onMenuClick?: () => void }> = ({ title, onMenuClick }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const navigationItems = useNavigation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    {onMenuClick && (
                        <IconButton edge="start" color="inherit" onClick={onMenuClick} sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={10} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                        <Avatar alt="User" src="/static/images/avatar/1.jpg" />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
                {navigationItems.map((item, index) =>
                    item.kind === "divider" ? (
                        <MenuItem key={index} disabled>──────────</MenuItem>
                    ) : (
                        <MenuItem key={item.segment} onClick={handleMenuClose}>
                            {item.icon}
                            {item.title}
                        </MenuItem>
                    )
                )}
                <MenuItem onClick={handleLogout}>logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default AppBarComponent;
