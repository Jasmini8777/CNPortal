import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './Navbar';
import Footer from '../Components/Footer';
// import "./ShowData.css";

const ShowData = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getUsers`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.email);
    setEditedData(user);
  };

const handleDelete = async (email) => {
  try {
    console.log("Attempting to delete user with email:", email);
    
    const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteUser/${email}`);
    
    console.log("Delete response:", res.data);
    fetchUsers(); // Refresh user list
  } catch (error) {
    console.error("Error deleting user:", error.response?.data || error.message);
  }
};

  



  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/updateUser/${editingUser}`,
        editedData
      );
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4 sm:p-6 bg-gradient-to-b from-white to-blue-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Employee Onboarding
        </h2>
        {users.length === 0 ? (
          <p className="text-gray-600 text-center">No users available.</p>
        ) : (
          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden hidden sm:table">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Department</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Phone</th>
                  <th className="py-2 px-4 text-left">City</th>
                  <th className="py-2 px-4 text-left">Job Type</th>
                  <th className="py-2 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((department, index) =>
                  department.users.map((user, i) => (
                    <tr key={`${index}-${i}`} className="border-b hover:bg-gray-100">
                      <td className="py-2 px-4">{department.department}</td>
                      <td className="py-2 px-4">
                        {editingUser === user.email ? (
                          <input
                            type="text"
                            name="firstname"
                            className="border rounded px-2 py-1 w-full"
                            value={editedData.firstname || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          `${user.firstname} ${user.lastname}`
                        )}
                      </td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">
                        {editingUser === user.email ? (
                          <input
                            type="text"
                            name="phone"
                            className="border rounded px-2 py-1 w-full"
                            value={editedData.phone || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          user.phone || "N/A"
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editingUser === user.email ? (
                          <input
                            type="text"
                            name="City"
                            className="border rounded px-2 py-1 w-full"
                            value={editedData.City || ""}
                            onChange={handleChange}
                          />
                        ) : (
                          user.City || "N/A"
                        )}
                      </td>
                      <td className="py-2 px-4">{user.jobtype || "N/A"}</td>
                      <td className="py-2 px-4 text-center">
                        {editingUser === user.email ? (
                          <>
                            <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2" onClick={handleSave}>
                              Save
                            </button>
                            <button className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600" onClick={() => setEditingUser(null)}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2" onClick={() => handleEdit(user)}>
                              Edit
                            </button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600" onClick={() => handleDelete(user.email)}>
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Mobile View (Stacked Cards) */}
            <div className="sm:hidden">
              {users.map((department, index) =>
                department.users.map((user, i) => (
                  <div key={`${index}-${i}`} className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <p><strong>Department:</strong> {department.department}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    
                    {editingUser === user.email ? (
                      <>
                        <input type="text" name="firstname" className="border rounded px-2 py-1 w-full mt-1" value={editedData.firstname || ""} onChange={handleChange} />
                        <input type="text" name="phone" className="border rounded px-2 py-1 w-full mt-1" value={editedData.phone || ""} onChange={handleChange} />
                        <input type="text" name="City" className="border rounded px-2 py-1 w-full mt-1" value={editedData.City || ""} onChange={handleChange} />
                        <input type="text" name="jobtype" className="border rounded px-2 py-1 w-full mt-1" value={editedData.jobtype || ""} onChange={handleChange} />
                        <button className="bg-green-500 text-white px-3 py-1 rounded-md mt-2 mr-2" onClick={handleSave}>Save</button>
                        <button className="bg-gray-500 text-white px-3 py-1 rounded-md mt-2" onClick={() => setEditingUser(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-md mt-2 mr-2" onClick={() => handleEdit(user)}>Edit</button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-2" onClick={() => handleDelete(user.email)}>Delete</button>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ShowData;