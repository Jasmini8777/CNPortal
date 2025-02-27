import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import Mission from './Mission'

function AttendanceSummary() {
  const [attendanceRecords, setAttendanceRecords] = useState([]); 
  const [logoutRecords, setLogoutRecords] = useState([]); 
  const [email, setEmail] = useState(""); 
  const [statusMessage, setStatusMessage] = useState(""); 
  const [visibleCount, setVisibleCount] = useState(3);

  // Fetch Attendance
  const fetchAttendance = async () => {
    const authToken = sessionStorage.getItem("authtoken");
    const userEmail = sessionStorage.getItem("userEmail");

    if (!userEmail) {
      setStatusMessage("Error: Email is required.");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        {
          params: { email: userEmail },
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (response.data && response.data.records) {
        setAttendanceRecords(response.data.records);
        setEmail(response.data.email);
        setStatusMessage("Attendance fetched successfully.");
      } else {
        setStatusMessage("No attendance records found.");
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setStatusMessage("Error fetching attendance records.");
    }
  };

  // Fetch Logout Records
  const fetchLogout = async () => {
    const authToken = sessionStorage.getItem("authtoken");
    const userEmail = sessionStorage.getItem("userEmail");

    if (!userEmail) {
      setStatusMessage("Error: Email is required.");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        { 
          params: { email: userEmail },
          headers: { Authorization: `Bearer ${authToken}` } 
        }
      );

      if (response.data && response.data.records) {
        setLogoutRecords(response.data.records);
        setStatusMessage("Logout fetched successfully.");
      } else {
        setLogoutRecords([]);
        setStatusMessage("No logout records found.");
      }
    } catch (error) {
      console.error("Error fetching logout:", error);
      setStatusMessage("Error fetching logout records.");
    }
  };

  // Fetch Data on Component Mount
  useEffect(() => {
    fetchAttendance();
    fetchLogout();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => (prev > 3 ? prev - 3 : 3));
  };

  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-200 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Attendance Summary</h1>

      {attendanceRecords.length > 0 ? (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          {attendanceRecords.slice(0, visibleCount).map((record, index) => {
            const logoutRecord = logoutRecords[index] || null;
            return (
              <div key={index} className="border-b py-4">
                <p className="text-gray-700">
                  <strong>Login Time:</strong> {new Date(record.time).toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <strong>Logout Time:</strong>{" "}
                  {logoutRecord ? new Date(logoutRecord.time).toLocaleString() : "Not logged out yet"}
                </p>
                <p className="text-gray-700">
                  <strong>Location:</strong> {record.latitude}, {record.longitude}
                </p>
              </div>
            );
          })}

          {/* Buttons for Show More / Show Less */}
          <div className="mt-4 flex justify-between">
            {visibleCount < attendanceRecords.length && (
              <button
                onClick={handleShowMore}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Show More
              </button>
            )}
            {visibleCount > 3 && (
              <button
                onClick={handleShowLess}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No attendance records found.</p>
      )}
      <div className="min-h-6 flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-200 "></div>
      
           
            <p className="text-gray-600">
              <Link className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-500 font-bold" to ='/index' > Back To Home </Link>
            </p>
         
    </div>
   
    
    </>
  );
}

export default AttendanceSummary;
