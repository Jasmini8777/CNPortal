import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

function DateTimeDisplay() {
  const [dateTime, setDateTime] = useState(new Date());
  const [name, setName] = useState(localStorage.getItem("name") || ""); 
  const [email, setEmail] = useState(localStorage.getItem("email") || ""); 
  const [statusMessage, setStatusMessage] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mockData, setMockData] = useState([]); // Dummy data for display

  console.log("Data Retrieved:", { name, email, latitude, longitude });

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchPosition();
  }, []);

  const fetchPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          console.error("Error fetching location: ", err);
          setStatusMessage("Error fetching location.");
        }
      );
    } else {
      setStatusMessage("Geolocation is not supported by your browser.");
    }
  };

  const formatDateTime = (date) => date.toLocaleString();

  const storeLogoutTime = async () => {
    const authToken = sessionStorage.getItem("authToken");
    if (!authToken) {
      console.error("No JWT token found. Please log in again.");
      setStatusMessage("No authentication token found. Please log in again.");
      return;
    }

    const logoutTime = new Date().toISOString(); // Store in ISO format for consistency

    if (!email || !name || !latitude || !longitude) {
      console.error("Missing required fields!");
      setStatusMessage("Please enter all required details before logging out.");
      return;
    }

    console.log("Sending Data:", {
      logoutTime,
      name,
      email,
      latitude,
      longitude,
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`, 
        {
          logoutTime,  
          name,
          email,
          latitude,
          longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setStatusMessage(response.data.message);
      console.log("Logout time stored successfully:", response.data);
    } catch (error) {
      console.error("Error storing logout time:", error.response?.data || error.message);
      setStatusMessage("Error storing logout time.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-200 p-6">
        <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Store Logout Time</h1>
          
          {/* Input Fields */}
          <label className="block mb-2 text-gray-700 font-semibold">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border rounded-md mb-4"
          />

          <label className="block mb-2 text-gray-700 font-semibold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border rounded-md mb-4"
          />

          {/* Current Time */}
          <div className="bg-gray-50 p-4 rounded-md mb-4 text-center">
            <h2 className="text-lg font-bold text-gray-700">Current Date and Time</h2>
            <p className="text-gray-600">{formatDateTime(dateTime)}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-md mb-4 text-center">
            <h2 className="text-lg font-bold text-gray-700">Log Your Time</h2>
            <p className="text-gray-600"> Log out with name & email. See your summary by clicking "Attendance." <br/>
                 <br/>
              <Link  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-500 font-bold" to ='/displayRecord' > Attendance</Link>
            </p>
          </div>

          {/* Location Section */}
          <div className="bg-gray-50 p-4 rounded-md mb-4 text-center">
            <h2 className="text-lg font-bold text-gray-700">Your Location</h2>
            {latitude && longitude ? (
              <div className="text-gray-600">
                <p><strong>Latitude:</strong> {latitude}</p>
                <p><strong>Longitude:</strong> {longitude}</p>
              </div>
            ) : (
              <p className="text-red-500">Fetching your location...</p>
            )}
          </div>

          {/* Store Data Button */}
          <button
            onClick={storeLogoutTime}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Store Date and Time
          </button>
        </div>

        {/* Display Status Message */}
        {statusMessage && <p className="mt-4 text-green-700">{statusMessage}</p>}

        {/* Display Mock Data */}
        {mockData.length > 0 && (
          <div className="mt-6 w-full max-w-lg bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-lg font-bold text-gray-700 mb-3">Stored Data</h2>
            {mockData.map((entry, index) => (
              <div key={index} className="border-b py-2">
                <p><strong>Name:</strong> {entry.name}</p>
                <p><strong>Email:</strong> {entry.email}</p>
                <p><strong>Login Time:</strong> {entry.loginTime}</p>
                <p><strong>Location:</strong> {entry.latitude}, {entry.longitude}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default DateTimeDisplay;
