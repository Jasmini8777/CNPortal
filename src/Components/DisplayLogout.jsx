import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplayLogout() {
    const [logout, setLogout] = useState([]);
    const [email, setEmail] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [visibleCount, setVisibleCount] = useState(2);

    const fetchAttendance = async () => {
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
                setLogout(response.data.records);
                setEmail(response.data.email);
                setStatusMessage("Logout fetched successfully.");
            } else {
                setLogout([]);
                setStatusMessage("No logout records found.");
            }
        } catch (error) {
            console.error("Error fetching logout:", error);
            setStatusMessage("Error fetching logout records.");
        }
    };

    useEffect(() => {
        fetchAttendance(); 
    }, []);

    // Show More/Less Handlers
    const handleShowMore = () => setVisibleCount(prev => prev + 2);
    const handleShowLess = () => setVisibleCount(2);

    return (
        <div>
           

            {logout.length > 0 ? (
                <>
                    {logout.slice(0, visibleCount).map((record, index) => (
                        <div key={index}>
                            <p >
                                Time: {new Date(record.time).toLocaleString()}
                            </p>
                          
                            <hr />
                        </div>
                    ))}

                  
                </>
            ) : (
                <p style={{ color: 'black' }}>No logout records found.</p>
            )}
        </div>
    );
}

export default DisplayLogout;
