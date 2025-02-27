const express = require('express'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../Modules/User'); 
const router = express.Router(); 

// POST method for login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {                                                                                                                                                     
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email .' });
        }
        console.log('login password', user);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({password:password, message: 'Invalid password.' });
        }

        const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });

       
        

        // Include name and email in the response
        res.status(200).json({
            message: 'Login successful',
            authToken,
            user: { name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ user:user,message: 'Internal Server Error' });
    }
});

// GET method for login (Example: Retrieve user details from token)
// GET method for retrieving user details from token
router.get('/login', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized request.' });
        }

        const authToken = authHeader.split(' ')[1];
        if (!authToken) {
            return res.status(401).json({ message: 'Token missing.' });
        }

        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('name email');

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User authenticated', user });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
});



module.exports = router;
