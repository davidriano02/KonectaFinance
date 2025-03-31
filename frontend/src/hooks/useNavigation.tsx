import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import PeopleIcon from "@mui/icons-material/People";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const useNavigation = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const basePath = user?.userType === "Administrator" ? "/admin" : "/dashboard"; // Define la base según el rol

    return [
        { segment: `${basePath}/dashboard`, title: "Dashboard", icon: <DashboardIcon /> },
        { segment: `${basePath}/sales`, title: "Ventas", icon: <ShoppingCartIcon /> },
        { kind: "divider" },
        ...(user?.userType === "Administrator"
            ? [
                { segment: `${basePath}/reports`, title: "Reportes", icon: <BarChartIcon /> },
                { segment: `${basePath}/users`, title: "Usuarios", icon: <PeopleIcon /> },
            ]
            : []),
        { segment: `${basePath}/integrations`, title: "Integraciones", icon: <LayersIcon /> },
    ];
};
