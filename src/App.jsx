import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import AdminLogin from "./Admin/AdminLogin";
import Index from "./Components/Index";
import Logout from "./Components/Logout";
import DateTimeDisplay from "./Components/Date";
import User from "./Admin/User";
import Admin from "./Admin/Admin";
import UserData from "./Admin/UserData";
import ShowData from "./Admin/ShowData";
import Start from "./Components/Start";
import About from "./Components/About";
import Profile from "./Components/Profile";
import Help from "./Components/Help";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute"; 
import ForgotPassword from "./Components/ForgotPassword";  
import ResetPassword from "./Components/ResetPassword";
import DisplayRecord from './Components/DisplayRecord';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Employee Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/index" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/Date" element={<DateTimeDisplay />} />
          <Route path="/displayRecord" element={<DisplayRecord />} />
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/userdata" element={<UserData />} />
          <Route path="/ShowData" element={<ShowData />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
