import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'Admin@123' && password === 'Admin@789') {
            sessionStorage.setItem("isAdmin", "true"); 
            console.log("Admin Logged In: ", sessionStorage.getItem("isAdmin"));
            navigate("/userdata");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-200 px-4">
            <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-2xl">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h2 className="text-center text-black text-2xl font-bold">Admin Login</h2>
                    {error && <p className="text-red-500 text-center">{error}</p>}

                    {/* Username Input */}
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Username" 
                        className="w-full p-3 rounded-lg bg-gray-200"
                    />

                    {/* Password Input */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}  
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-3 rounded-lg bg-gray-200"
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

                    {/* Login Button */}
                    <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg">
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
