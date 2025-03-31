import { List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { useNavigation } from "../hooks/useNavigation";
import { useNavigate } from "react-router-dom";

const DrawerNavigation = () => {
    const navigationItems = useNavigation();
    const navigate = useNavigate();

    return (
        <List>
            {navigationItems.map((item, index) =>
                item.kind === "divider" ? (
                    <Divider key={index} />
                ) : (
                    <ListItemButton
                        key={item.segment}
                        onClick={() => item.segment && navigate(item.segment)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItemButton>
                )
            )}
        </List>
    );
};

export default DrawerNavigation;
