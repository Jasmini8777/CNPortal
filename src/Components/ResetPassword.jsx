import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const [message, setMessage] = useState("");
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password`, {
                token,
                password: password.trim(),
            });
            setMessage(response.data.message);
            setTimeout(() => navigate("/"), 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to reset password.");
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-200 px-4">
            <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-2xl">
                <h2 className="text-center text-black text-2xl font-bold">Reset Password</h2>
                {message && <p className="text-center text-green-500">{message}</p>}

                <form className="space-y-6" onSubmit={handleReset}>
                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New Password"
                            required
                            className="w-full py-3 pl-4 pr-10 text-gray-700 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Show Password Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className="mr-2"
                        />
                        <label htmlFor="showPassword" className="text-sm text-gray-600">
                            Show Password
                        </label>
                    </div>

                    {/* Reset Password Button */}
                    <button
                        type="submit"
                        className="w-full py-3 border text-white font-bold border-blue-500 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
