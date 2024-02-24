const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post("/signup", async (req, res) => {
    try {
        const { username, type, email, password, profile_photo, dob } = req.body;

        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        // If no user with the provided email exists, create a new user
        const user = new User({ username, type, email, password, profile_photo, dob });
        await user.save();
        res.status(201).json({ "username": user.username });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

router.post("/login", async (req, res) => {
    try {
        console.log("hi")
        const { email, password } = req.body;

        // Find the user with the provided email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Check if the provided password matches the stored password
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Password is correct, user is authenticated
        res.status(200).json({ message: 'Login successful.', username: user.username, type: user.type });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

module.exports = router;
