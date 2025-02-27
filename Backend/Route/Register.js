const express = require('express');
const jwt = require('jsonwebtoken'); 
const router = express.Router(); 
const User = require('../Modules/User'); 

const cors = require('cors');

// POST /api/register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }
         console.log('register password',password);
        const newUser = new User({ name, email, password });
        await newUser.save();
        console.log(' registered password db :', newUser);
        res.status(201).json({ message: 'User registered successfully!', user: { name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// router.delete("/deleteUser/:email", async (req, res) => {
//     try {
//         const { email } = req.params;

//         // Ensure email exists
//         const result = await User.deleteOne({ email });
//         if (result.deletedCount === 0) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         res.json({ message: "User deleted successfully." });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Failed to delete user." });
//     }
// });




module.exports = router; 
