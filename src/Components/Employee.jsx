

import React, { useState, useEffect } from "react";
import axios from "axios";
function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [visibleRecords, setVisibleRecords] = useState({}); // Added this state
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/users`,
                    {
                        headers: {
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.data.users && response.data.users.length > 0) {
                    setUsers(response.data.users[0].data);
                } else {
                    setError("No login data available.");
                }
            } catch (err) {
                console.error("Error fetching login data:", err.message);
                setError("Failed to fetch login data.");
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchUserDetails = async () => {
            let details = {};

            await Promise.all(
                users.map(async (user) => {
                    try {
                        const response = await axios.get(
                            `${import.meta.env.VITE_BACKEND_URL}/api/getUser/${user.email}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                                },
                            }
                        );

                        if (response.data) {
                            details[user.email] = response.data;
                        }
                    } catch (error) {
                        console.error("Error fetching user details:", error.message);
                    }
                })
            );

            setUserDetails(details);
        };

        if (users.length > 0) {
            fetchUserDetails();
        }
    }, [users]);

    // Function to show more records
    const showMore = (email) => {
        setVisibleRecords((prev) => ({
            ...prev,
            [email]: (prev[email] || 3) + 3, // Show 3 more records
        }));
    };

    // Function to show fewer records
    const showLess = (email) => {
        setVisibleRecords((prev) => ({
            ...prev,
            [email]: Math.max((prev[email] || 3) - 3, 3), // Minimum 3 records
        }));
    };

    if (error) return <p>{error}</p>;
    if (users.length === 0) return <p>Loading user data...</p>;

    return (
        <div className="container mx-auto p-8 bg-gradient-to-b from-white to-blue-200 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Attendance Summary</h1>
            <div className="grid md:grid-cols-2 gap-8">
                {users.map((user, index) => {
                    const details = userDetails[user.email] || {};
                    const visibleCount = visibleRecords[user.email] || 3;
                    return (
                        <div key={index} className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
                            <p className="text-lg font-semibold text-gray-800">
                                Email: <span className="text-gray-600">{user.email}</span>
                            </p>
                            <p className="text-gray-800">
                                Department: <span className="text-gray-600">{details.department || "N/A"}</span>
                            </p>
                            <p className="text-gray-800">
                                First Name: <span className="text-gray-600">{details.user?.firstname || "N/A"}</span>
                            </p>
                            <p className="text-gray-800">
                                Job Type: <span className="text-gray-600">{details.user?.jobtype || "N/A"}</span>
                            </p>
                            <h3 className="text-xl font-semibold mt-6 text-gray-900 border-b pb-2">
                                Login and Logout Times
                            </h3>
                            <ul className="mt-4 space-y-4">
                                {user.loginTimes.slice(0, visibleCount).map((login, idx) => (
                                    <li key={idx} className="bg-gray-200 p-4 rounded-lg">
                                        <p className="text-gray-800">
                                            <strong>Login Time:</strong> {new Date(login.time).toLocaleString()}
                                        </p>
                                        <p className="text-gray-800">
                                            <strong>Latitude:</strong> {login.latitude} | <strong>Longitude:</strong> {login.longitude}
                                        </p>
                                        <p className="text-gray-800">
                                            <strong>Logout Time:</strong> {user.logoutTimes?.[idx]?.time
                                                ? new Date(user.logoutTimes[idx].time).toLocaleString()
                                                : "N/A"}
                                        </p>
                                        <p className="text-gray-800">
                                            <strong>Latitude:</strong> {user.logoutTimes?.[idx]?.latitude || "N/A"} |{" "}
                                            <strong>Longitude:</strong> {user.logoutTimes?.[idx]?.longitude || "N/A"}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 flex gap-4">
                                {visibleCount < user.loginTimes.length && (
                                    <button
                                        onClick={() => showMore(user.email)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Show More
                                    </button>
                                )}
                                {visibleCount > 3 && (
                                    <button
                                        onClick={() => showLess(user.email)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Show Less
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AdminDashboard;
