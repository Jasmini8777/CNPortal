import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!sessionStorage.getItem("authToken")
    );

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(!!sessionStorage.getItem("authToken"));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    try {
        const decodedToken = jwtDecode(sessionStorage.getItem("authToken"));
        if (decodedToken.exp < Date.now() / 1000) {
            sessionStorage.removeItem("authToken");
            return <Navigate to="/home" replace />;
        }
        return <Outlet />;
    } catch (error) {
        sessionStorage.removeItem("authToken");
        return <Navigate to="/home" replace />;
    }
};

export default ProtectedRoute;
