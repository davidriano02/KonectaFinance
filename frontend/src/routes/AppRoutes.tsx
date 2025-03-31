// AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import DashboardRedirect from "../components/DashboardRedirect";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Sales from "../pages/Sales";
import Users from "../pages/Users";
import Dashboard  from "../pages/Dashboard"


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />


            <Route path="/redirect" element={<DashboardRedirect />} />

            <Route element={<ProtectedRoute allowedRoles={["Administrator"]} />}>
                <Route path="/admin/*" element={<Dashboard />}>
                    <Route index element={<AdminLayout />} />
                    <Route path="users" element={<Users />} />
                    <Route path="sales" element={<Sales />} />
                </Route>
            </Route>


            <Route element={<ProtectedRoute allowedRoles={["Advisor"]} />}>
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<DashboardLayout />} />
                    <Route path="sales" element={<Sales />} />
                </Route>
            </Route>


            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default AppRoutes;
