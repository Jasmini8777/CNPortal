import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Track admin login status
    const navigate = useNavigate();

    useEffect(() => {
        // Check if admin is logged in
        setIsAdmin(sessionStorage.getItem("isAdmin") === "true");
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("isAdmin"); // Remove admin session
        setIsAdmin(false); // Update state
        navigate("/AdminLogin"); // Redirect to Admin Login
    };

    return (
        <>
            <header className="bg-white py-4 shadow-md">
                <nav className="flex justify-between items-center w-[92%] mx-auto">
                    <div className="text-2xl font-bold text-blue-600 cursor-pointer">
                        CareerNaksha
                    </div>

                    {/* Desktop & Mobile Menu */}
                    <div
                        className={`nav-links md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 w-full md:w-auto flex items-center px-5 z-50 transition-all duration-500 ease-in-out ${
                            isOpen ? 'top-[9%]' : 'top-[-100%]'
                        }`}
                    >
                        <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                            <li className="hover:text-blue-500 font-bold">
                                <Link to="/UserData">Add Employees</Link>
                            </li>
                            <li className="hover:text-blue-500 font-bold">
                                <Link to="/ShowData">Manage Employee</Link>
                            </li>
                            <li className="hover:text-blue-500 font-bold">
                                <Link to="/user">Attendance Records</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Admin Logout Button (Only if logged in) */}
                        {sessionStorage.getItem("isAdmin") === "true" && (
                              <button
                                  onClick={handleLogout}
                                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 font-bold">
    
                                 Logout
                                 </button>
                        )}


                        {/* Mobile Menu Button */}
                        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-3xl cursor-pointer">
                            {isOpen ? <IoClose /> : <IoMenu />}
                        </button>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Navbar;
