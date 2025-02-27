const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require ('../Modules/User');
const router = express.Router();

// Reset Password Route
router.post("/reset-password", async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ message: "Token and new password are required." });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token Data:", decoded); // Debugging

        // Find user by email (decoded from token)
        const user = await User.findOne({ email: decoded.email });
        console.log('----------');
        console.log("reset Password", user);
        console.log('----------');
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }

        // Hash the new password
        // const hashedPassword = await bcrypt.hash(password, 10);
        user.password = password;
        await user.save();
        console.log(" Reset DB Password", user);
        res.json({ message: "Password reset successfully. You can now log in with the new password." });

    } catch (error) {
        console.error("Reset password error:", error.message);
        res.status(400).json({ message: "Invalid or expired token." });
    }
});


module.exports = router;
