const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Doctor = require('../models/doctorModel');
const Pharmacist = require('../models/pharmacistModel');
const QRCode = require('qrcode');
router.post("/signup", async (req, res) => {
    try {
        const { username, type, email, password, profile_photo, dob } = req.body;
        console.log("hii")
        const dobDate = new Date(dob);
        console.log("hii")
        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        // Create a new user based on the type
        let newUser;
        if (type === 'doctor') {
            console.log("I am inside doctor");
            const doctor = new Doctor();
            await doctor.save();
            // const doctor = await Doctor.create();
            console.log(doctor);
            //console.log(doctor._id);
            newUser = new User({ username, type, email, password, profile_photo, dob : dobDate, doctor_profile: doctor._id });

        } else if (type === 'pharmacist') {
            const pharmacist = new Pharmacist();
            await pharmacist.save();
            newUser = new User({ username, type, email, password, profile_photo, dob: dobDate, pharmacist_profile: pharmacist._id });
        } else {
            const qrCodeData = JSON.stringify({ email });

            // Generate QR code image
            const qrCodeImage = await QRCode.toDataURL(qrCodeData);

            newUser = new User({ username, type, email, password, profile_photo, dob: dobDate,qr_code: qrCodeImage});
        }

        await newUser.save();
        res.status(201).json({ "username": newUser.username });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
            console.log("hekllo");
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
        res.status(200).json({ message: 'Login successful.', user_id: user._id, type: user.type });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

module.exports = router;
