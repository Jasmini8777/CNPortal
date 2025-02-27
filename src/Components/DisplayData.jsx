import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./DisplayData.css"; 

function DisplayData() {
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-200 p-6">
        {/* Main Card - Unified Container */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          
          {/* Header Section (Logo & Welcome Text in the Same Row) */}
          <div className="flex flex-col md:flex-row items-center md:items-center border-b pb-6 mb-6">
            {/* Logo */}
            <div className="md:w-1/3 flex justify-center md:justify-start">
              <img src="/logo.png" alt="logo" className="h-28 md:h-36 w-auto" />
            </div>
  
            {/* Welcome Text */}
            <div className="md:w-2/3 flex justify-center md:justify-end">
              <p className="text-gray-800 text-2xl md:text-3xl font-semibold text-center md:text-right leading-snug">
                {data?.user ? (
                  <>
                    Hello, {data.user.firstname}! <br />
                    Welcome To Career Naksha <br />
                    Attendance Portal
                  </>
                ) : (
                  <span className="text-gray-600 text-lg md:text-2xl">{statusMessage}</span>
                )}
              </p>
            </div>
          </div>
  
          {/* User Information Section */}
          {data?.user && (
            <div className="space-y-4">
              {/* First Row: Three Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg text-gray-800 shadow-sm">
                  <strong>Department:</strong> {data?.department || "N/A"}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-gray-800 shadow-sm">
                  <strong>First Name:</strong> {data.user.firstname || "N/A"}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-gray-800 shadow-sm">
                  <strong>Last Name:</strong> {data.user.lastname || "N/A"}
                </div>
              </div>
  
              {/* Second Row: Two Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg text-gray-800 shadow-sm">
                  <strong>Email:</strong> {data.user.email || "N/A"}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-gray-800 shadow-sm">
                  <strong>Job Type:</strong> {data.user.jobtype || "N/A"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
        );
}

export default DisplayData;
