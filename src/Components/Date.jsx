  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import axios from "axios";
  import Navbar from './Navbar';
  import Footer from './Footer';
  // import './Date.css'

  function DateTimeDisplay() {
    const [dateTime, setDateTime] = useState(new Date());
    const [inputName, setInputName] = useState(""); // For user input name
    const [inputEmail, setInputEmail] = useState(""); // For user input email
    const [statusMessage, setStatusMessage] = useState(""); // For status message (success/error)
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [mockData, setMockData] = useState([]);


    // Function to format date and time in IST (Indian Standard Time)
    const formatLoginTime = (date) => {
      const options = {
        weekday: "short", 
        year: "numeric", 
        month: "short", 
        day: "numeric", 
        hour: "numeric", 
        minute: "numeric", 
        second: "numeric",
        hour12: true, 
        timeZone: "Asia/Kolkata", 
      };

      return date.toLocaleString("en-IN", options); 
    };

    // Update the time every second
    useEffect(() => {
      const interval = setInterval(() => {
        setDateTime(new Date());
      }, 1000);

      return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    // Fetch user's location on component mount
    useEffect(() => {
      fetchPosition();
    }, []);

    // Function to fetch the user's location
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

    // Function to store date and time in the database
    const storeDateTime = async () => {
      const authToken = sessionStorage.getItem("authtoken");
      const name = inputName.trim();
      const email = inputEmail.trim();

      // Validate inputs
      if (!name || !email) {
        setStatusMessage("Name and Email are required.");
        return;
      }

      const formattedLoginTime = formatLoginTime(new Date()); // Format current date and time in IST

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/user`,
          {
            loginTime: formattedLoginTime,
            email,
            name,
            latitude: latitude || "N/A", // Pass latitude here
            longitude: longitude || "N/A", // Pass longitude here
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setStatusMessage(response.data.message || "Data stored successfully!");
      } catch (error) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
          setStatusMessage(error.response.data.message || "Server error occurred.");
        } else {
          console.error("Network Error:", error);
          setStatusMessage("Unable to connect to server.");
        }
      }
    };

    return (
      <>
      <Navbar/>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-200 p-6">
        <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Store Login Time</h1>
          
          <label className="block mb-2 text-gray-700 font-semibold">Name:</label>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border rounded-md mb-4"
          />

          <label className="block mb-2 text-gray-700 font-semibold">Email:</label>
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border rounded-md mb-4"
          />

          <div className="bg-gray-50 p-4 rounded-md mb-4 text-center">
            <h2 className="text-lg font-bold text-gray-700">Current Date and Time</h2>
            <p className="text-gray-600">{formatLoginTime(dateTime)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md mb-4 text-center">
            <h2 className="text-lg font-bold text-gray-700">Log Your Time</h2>
            <p className="text-gray-600"> Log in with name & email. See your summary by clicking "Attendance." <br/>
                 <br/>
              <Link  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-500 font-bold" to ='/displayRecord' > Attendance</Link>
            </p>
          </div>

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

          <button
            onClick={storeDateTime}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 mb-4"
          >
            Store Date and Time
          </button>
          
          {/* <Link to="/logout"
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200 mb-4 text-center block"
          >
            Stop
          </Link> */}
        </div>

        {statusMessage && <p className="mt-4 text-green-700">{statusMessage}</p>}

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
