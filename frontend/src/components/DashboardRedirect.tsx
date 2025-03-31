import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const DashboardRedirect = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (!user?.userType) return;

        if (user.userType === "Administrator") {
            if (window.location.pathname !== "/admin") {
                console.log("Redirigiendo a /admin");
                navigate("/admin");
            }
        } else {
            if (window.location.pathname !== "/dashboard") {
                console.log("Redirigiendo a /dashboard");
                navigate("/dashboard");
            }
        }
    }, [navigate, user]);

    return null;
};

export default DashboardRedirect;
