import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
    const [userData, setUserData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState("");     

    useEffect(() => {
        const fetchAllUserData = async () => {
            try {
                // Fetch all user data from the API
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/logoutTimes`, 
                    {
                        headers: {
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log(response.data); 

              
                if (response.data && response.data.users) {
                    setUserData(response.data.users); 
                } else {
                    setError("No users data available.");
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching user data:", err.message);
                setError("Failed to fetch user data."); 
                setLoading(false); 
            }
        };

        fetchAllUserData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>; 
    }

    return (
       
            
            <div>
                {userData.length > 0 ? (
                    userData.map((user, index) => (
                        <div key={index}>
                            <h2>{user.email}</h2>
                           
                            {user.records.length > 0 ? (
                                user.records.map((record, i) => (
                                    <div key={i}>
                                        <p>LogoutTime: {new Date(record.time).toLocaleString()}</p>
                                        
                                        <hr />
                                    </div>
                                ))
                            ) : (
                                <p>No attendance records found for this user.</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
       
    );
}

export default AdminDashboard;
