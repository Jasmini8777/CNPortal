import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState(""); // State for success/error message

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_zwz6dwq", "template_5nq47o8", form.current, {
        publicKey: "is3iCABwsinPZZbCK",
      })
      .then(
        () => {
          setStatusMessage("Message sent successfully! ✅");
          form.current.reset(); // Clear the form after success
        },
        (error) => {
          setStatusMessage("Failed to send message. ❌ Please try again.");
          console.error("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg transform transition-all duration-300 hover:scale-105"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Contact Us
        </h2>

        <label className="block text-gray-700 font-medium mb-2">Name</label>
        <input
          type="text"
          name="from_name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm transition duration-300"
          placeholder="Enter your name"
          required
        />

        <label className="block text-gray-700 font-medium mt-4 mb-2">Email</label>
        <input
          type="email"
          name="from_email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm transition duration-300"
          placeholder="Enter your email"
          required
        />

        <label className="block text-gray-700 font-medium mt-4 mb-2">Message</label>
        <textarea
          name="message"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm transition duration-300 h-40 resize-none"
          placeholder="Write your message..."
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg mt-6 font-semibold text-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Send Message
        </button>

        {/* Status Message Display */}
        {statusMessage && (
          <p className="text-center mt-4 text-lg font-medium text-green-600">
            {statusMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactUs;
