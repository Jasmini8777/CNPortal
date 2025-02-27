const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS Configuration
app.use(cors({
    origin: ["http://localhost:5173"],  
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));

// Security Headers (No Duplicate)
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

// Import Routes
const register = require("./Route/Register");
const loginRoute = require("./Route/Login");
const userRoute1 = require("./Route/Data");
const logoutTime = require("./Route/LogoutTime");
const UserRoute1 = require("./Admin/Route/UserRoute1");
const GoogleLogin = require("./Route/GoogleLogin");
const forgotPassword = require('./Route/ForgotPassword');
const resetPassword = require('./Route/ResetPassword');

// Use Routes
app.use("/api", register);
app.use("/api", loginRoute);
app.use("/api", userRoute1);
app.use("/api", logoutTime);
app.use("/api", UserRoute1);
app.use("/api", GoogleLogin);
app.use('/api', forgotPassword);
app.use('/api', resetPassword);

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("✅ MongoDB connected");
        console.log("🌐 GOOGLE_CLIENT_ID:", process.env.VITE_GOOGLE_CLIENT_ID);  // Corrected Log

        // Start Server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error("❌ MongoDB Connection Error:", err));
