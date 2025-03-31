import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import React from "react";


interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(user.userType)) return <Navigate to="/unauthorized" replace />;

    return <Outlet />;
};

export default ProtectedRoute;
