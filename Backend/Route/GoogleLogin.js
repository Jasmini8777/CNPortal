const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../Modules/User");

require("dotenv").config();

const router = express.Router();
const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

// 🔹 Verify Google Token and Authenticate User
router.post("/google-login", async (req, res) => {
    try {
        const { credential } = req.body;  // Ensure 'credential' matches frontend
        if (!credential) return res.status(400).json({ message: "Token missing!" });

        // 🔑 Verify the Google ID token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.VITE_GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;
        console.log('email', email);

        // 🔍 Check if user exists; if not, create a new user
        let user = await User.findOne({ email });
        // if (!user) {
        //     user = new User({ name, email });
        //     await user.save();
        // }

        // 🔐 Generate JWT token
        const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // 🟢 Send token and user details
        res.json({ authToken, user });

    } catch (error) {
        console.error("Google Login Error:", error.message);
        res.status(500).json({ message: "Google login failed. Please try again." });
    }
});

module.exports = router;


// cloud console logging
//https://console.cloud.google.com/apis/credentials?project=attendance-451716