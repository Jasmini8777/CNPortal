import react from 'react';
import axios from 'axios';
import { useState } from 'react';

const ForgotPassword =() => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setMessage('');

        console.log('email', email);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/forgot-password`, {email});
            setMessage(response.data.message);


        } catch (error) {
            setMessage(error.message);
        }
    };

    return(
        <>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-200 px-4">
            <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-2xl">
                <h2 className="text-center text-black text-2xl font-bold">Forgot Password</h2>
                {message && <p className="text-center text-green-500">{message}</p>}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full py-3 pl-4 pr-10 text-gray-700 border border-gray-300 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 border text-white font-bold border-blue-500 rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-200"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
        </>
    )
};

export default ForgotPassword;