import { useState } from "react";
import Navbar from "./Navbar";
import Footer from '../Components/Footer'
// import "./UserData.css";

const Userform = () => {
  const [Formdata, SetFormdata] = useState({
    firstname: "",
    
    lastname: "",
    Birthdate: "",
    State: '',
    City: "",
    email: "",
    secondemail: "",
    phone: "",
    department: "",
    jobtype: "",
    joinDate: "",
    contractDuration: "",
    internshipDuration: "",
    endDate: "",
    shift: "",
    startTime: "",
    endTime: "",
  });

  const [Photo, setPhoto] = useState(null);  
  const [Previews, setPreviews] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreviews(URL.createObjectURL(file));
  };


  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!Formdata.firstname || !Formdata.lastname || !Formdata.email) {
      alert("First Name, Last Name, and Email are required.");
      return;
    }

    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/saveUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Formdata),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        alert(result.error || "An error occurred");
      } else {
        const result = await response.json();
        alert(result.message || "Form submitted successfully");
        SetFormdata({});
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-200 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Enter Employee Data</h1>
        <form onSubmit={handlesubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General Fields */}
          {[
            ["firstname", "First Name", "text"],
            ["lastname", "Last Name", "text"],
            ["Birthdate", "Birthdate", "date"],
            ["City", "City", "text"],
            ["State", "State", "text"],
            ["email", "Email (Same as login)", "email"],
            ["secondemail", "Secondary Email", "email"],
            ["phone", "Phone Number", "tel"],
          ].map(([name, label, type]) => (
            <div key={name}>
              <label className="block text-gray-700">{label}:</label>
              <input
                type={type}
                name={name}
                value={Formdata[name] || ""}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
              />
            </div>
          ))}

          {/* Department Selection */}
          <div>
            <label className="block text-gray-700">Department:</label>
            <select
              id="department"
              name="department"
              value={Formdata.department || ''}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Fullstack">Fullstack</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Social Media">Social Media</option>
              <option value="Public Relation">Public Relation</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Content Writer">Content Writer</option>
            </select>
          </div>

          {/* Job Type Selection */}
          <div>
            <label className="block text-gray-700">Job Type:</label>
            <select
              name="jobtype"
              value={Formdata.jobtype}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-300"
            >
              <option value="">Select Job Type</option>
              <option value="Employee">Employee</option>
              <option value="Intern">Intern</option>
            </select>
          </div>

          {/* Employee Fields */}
          {Formdata.jobtype === "Employee" && (
            <>
              <div>
                <label className="block text-gray-700">Employee Options:</label>
                <select
                  name="employee-options"
                  className="mt-1 p-2 w-full border rounded-md shadow-sm"
                >
                  <option value="">Select Option</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Join Date:</label>
                <input
                  type="date"
                  name="joinDate"
                  value={Formdata.joinDate}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Contract Duration (Years):</label>
                <input
                  type="number"
                  name="contractDuration"
                  value={Formdata.contractDuration}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </>
          )}

          {/* Intern Fields */}
          {Formdata.jobtype === "Intern" && (
            <>
              <div>
                <label className="block text-gray-700">Intern Type:</label>
                <select
                  name="intern-options"
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select Option</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Join Date:</label>
                <input type="date" name="joinDate" className="mt-1 p-2 w-full border rounded-md" />
              </div>
              <div>
                <label className="block text-gray-700">Internship Duration (Months):</label>
                <input type="number" name="internshipDuration" className="mt-1 p-2 w-full border rounded-md" />
              </div>
              <div>
                <label className="block text-gray-700">End Date:</label>
                <input type="date" name="endDate" className="mt-1 p-2 w-full border rounded-md" />
              </div>
              <div>
                <label className="block text-gray-700">Shift:</label>
                <select
                  id="shift"
                  name="shift"
                  value={Formdata.shift || ''}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select Shift</option>
                  <option value="morning">Morning - 10:30 To 2:30</option>
                  <option value="afternoon">Afternoon - 2:30 To 6:30</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              {Formdata.shift === 'custom' && (
                <>
                  <div>
                    <label>Enter Start Time:</label>
                    <input type="text" name="startTime" value={Formdata.startTime || ''} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md"/>
                  </div>
                  <div>
                    <label>Enter End Time:</label>
                    <input type="text" name="endTime" value={Formdata.endTime || ''} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md"/>
                  </div>
                </>
              )}
            </>
          )}
        </form>
        <div className="flex justify-center mt-6">
          <button type="submit" onClick={handlesubmit} className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Submit
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Userform;
