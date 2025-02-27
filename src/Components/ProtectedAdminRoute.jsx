import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
    const isAdminAuthenticated = sessionStorage.getItem("isAdmin");
    console.log("Admin Auth Status (After Refresh):", isAdminAuthenticated); // Debugging

    return isAdminAuthenticated === "true" ? <Outlet /> : <Navigate to="/AdminLogin" />;
};

export default ProtectedAdminRoute;
