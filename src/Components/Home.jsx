import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Home = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false); // 👈 New state
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("authToken");
        sessionStorage.clear();
    }, []);

    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
        setError("Email and password are required.");
        return;
    }

    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
            email: formData.email.trim(),
            password: formData.password,
        });

        const { authToken, user } = res.data;
        sessionStorage.setItem("authToken", authToken);
        sessionStorage.setItem("userId", user.id);
        sessionStorage.setItem("userName", user.name);
        sessionStorage.setItem("userEmail", user.email);
        console.log('login data',user);
        navigate("/index", { replace: true });
    } catch (err) {
        console.error("Login Error:", err);
        console.log('backend login data',error.response.data.user);
        setError(err.response?.data?.message || "Invalid email or password.");
    }
};


const handleGoogleLoginSuccess = async (response) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/google-login`, {
            credential: response.credential,  // Ensure 'credential' matches backend
        });

            const { authToken, user } = res.data;
            console.log('google login data',user);
            console.log('--------------------------------');
            console.log('google authtoken',authToken);
            sessionStorage.setItem("authToken", authToken);
            sessionStorage.setItem("userId", user.id);
            sessionStorage.setItem("userName", user.name);
            sessionStorage.setItem("userEmail", user.email);

            navigate("/index", { replace: true });
        } catch (err) {
            console.error("Google Login Error:", err);
            setError("Google login failed. Please try again.");
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error("Google Login Failed:", error);
        setError("Google login was unsuccessful.");
    };

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-200 px-4">
                <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-2xl">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h2 className="text-center text-black text-2xl font-bold">Login</h2>
                        {error && <p className="text-red-500 text-center">{error}</p>}

                        {/* Email Input */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Email"
                                required
                                className="w-full pl-10 py-3 text-gray-700 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                            <input
                                type={showPassword ? "text" : "password"} // 👈 Toggle here
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Password"
                                required
                                className="w-full pl-10 py-3 text-gray-700 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 border text-white font-bold border-blue-500 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200"
                        >
                            LOGIN
                        </button>

                        {/* Google Login Button */}
                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={handleGoogleLoginFailure}
                            />
                        </div>

                        <p className="text-center text-sm text-gray-600">
                            Login As an Admin{" "}
                            <Link to="/AdminLogin" className="text-blue-500 hover:underline">
                                Admin
                            </Link>
                        </p>

                        <div className="text-center my-4">
                            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <p className="text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-blue-500 hover:underline">
                                Create Your Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Home;
