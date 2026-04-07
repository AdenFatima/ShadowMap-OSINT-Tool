const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Route: POST /api/auth/signup
router.post('/signup', async (req, res) => {
    try {
        // 1. Data from frontend
        const { name, email, password } = req.body;

        // 2. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "A user with this email already exists." });
        }

        // 3. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create new user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        // 5. Save to MongoDB
        await user.save();

        // 6. Send message to frontend
        res.status(201).json({ message: "User created successfully!" });

    } catch (err) {
        console.error("Signup Error:", err.message);
        res.status(500).send("Server Error");
    }

});

// Route: POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        // 1. Data from frontend
        const { email, password } = req.body;

        // 2. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 4. Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 5. Send token to frontend
        res.json({
            message: "Login successful!",
            token: token
        });

    }catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;