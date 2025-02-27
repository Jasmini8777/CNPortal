import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("isAdmin"); // Remove admin session
        navigate("/AdminLogin"); // Redirect to Admin Login page
    }, []);

    return null; // No UI needed
};

export default AdminLogout;
