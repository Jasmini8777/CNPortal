import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaEnvelope, FaBuilding, FaBriefcase } from "react-icons/fa";
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';


function Profile() {  // 🔹 FIX: Renamed function from DisplayData to Profile
    const [data, setData] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const authToken = sessionStorage.getItem("authtoken");
            const userEmail = sessionStorage.getItem("userEmail");

            if (!userEmail) {
                setStatusMessage("No email found in localStorage.");
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/getUser/${userEmail}`,
                    { headers: { Authorization: `Bearer ${authToken}` } }
                );

                if (response.data) {
                    setData(response.data);
                    setStatusMessage("Data fetched successfully.");
                } else {
                    setStatusMessage("No data found.");
                }
            } catch (error) {
                console.error("Error fetching data:", error.response?.data || error.message);
                setStatusMessage("Error fetching data.");
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden mt-11">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6  text-center text-white">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
            <FaUserAlt className="text-blue-500 text-5xl" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-3">
          {data?.user?.firstname || "N/A"} {data?.user?.lastname || "N/A"}
        </h2>
        <p className="text-gray-200">{data?.user?.jobtype || "N/A"}</p>
      </div>

      {/* Profile Details */}
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3 text-gray-700">
          <FaEnvelope className="text-blue-500 text-lg" />
          <span>{data?.user?.email || "N/A"}</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-700">
          <FaBuilding className="text-blue-500 text-lg" />
          <span>Department: {data?.department || "N/A"}</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-700">
          <FaBriefcase className="text-blue-500 text-lg" />
          <span>Job Type: {data?.user?.jobtype || "N/A"}</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-700">
          <FaBriefcase className="text-blue-500 text-lg" />
          <span>City : {data?.user?.City || "N/A"}</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-700">
          <FaBriefcase className="text-blue-500 text-lg" />
          <span>State : {data?.user?.State || "N/A"}</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-700">
          <FaBriefcase className="text-blue-500 text-lg" />
          <span>phone: {data?.user?.phone || "N/A"}</span>
        </div>
      </div>
    </div>
        )
           <Footer/>
        </>
    );
}

export default Profile;  // 🔹 FIX: Exporting with correct function name
