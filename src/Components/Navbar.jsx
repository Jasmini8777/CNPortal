import { Link2Off } from "lucide-react";
import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userEmail");
    navigate("/home", { replace: true });
  };
  
  return (
    <header className="bg-white py-4 shadow-md">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        <div className="text-2xl font-bold text-blue-600 cursor-pointer">
          CareerNaksha
        </div>
        
        {/* Desktop & Mobile Menu */}
        <div
          className={`nav-links md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 w-full md:w-auto flex items-center px-5 z-50 transition-all duration-500 ease-in-out ${isOpen ? 'top-[9%]' : 'top-[-100%]'}`}
        >
         <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li className="hover:text-blue-500 font-bold"><Link to="/index">Home</Link></li>
            <li className="hover:text-blue-500 font-bold"><Link to="/date">Clock-in</Link></li>
            <li className="hover:text-blue-500 font-bold"><Link to="/logout">Clock-out</Link></li>
            <li className="hover:text-blue-500 font-bold"><Link to="/about">About Us</Link></li>
            <li className="hover:text-blue-500 font-bold"><Link to="/help">Help</Link></li>
        </ul>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} /> 
          </Link>
          {/* Logout Button */}
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 font-bold"
          >
            Logout
          </button>
          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-3xl cursor-pointer">
            {isOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;