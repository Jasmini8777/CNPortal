import React from "react";
import {Link} from "react-router-dom";

const CareerNaksha = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/back.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 lg:px-0 max-w-2xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-extrabold mb-4">
          CareerNaksha
        </h1>
        <p className="text-lg text-gray-300 mb-6">
        Welcome to Our Attendance Portal
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/home"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CareerNaksha;