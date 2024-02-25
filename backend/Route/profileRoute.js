const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Doctor = require('../models/doctorModel');
const Pharmacist = require('../models/pharmacistModel');
const mongoose = require('mongoose');

router.post("/updatedoctor", async (req, res) => {
    try {
        // console.log(req.body)
        const userId = req.body.id;
        // const validUserId = mongoose.Types.ObjectId(userId);
        const user = await User.findOne({ _id: userId });
        console.log(user);
        const doctorId = user.doctor_profile;

        const {
            specialization,
            availability,
            Bio,
            Experiance,
            Phone_no,
            Counselling_fee
        } = req.body;

        // Find the doctor by ID
        let doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found.' });
        }
        console.log(availability)
        const convertedAvailability = availability.map(({ day, slots }) => ({
            day,
            slots: slots.map(time => ({ time, isBooked: false }))
            // Add the isBooked field for each time slot
        }));
        console.log(convertedAvailability)
        // Update the doctor's information
        doctor.specialization = specialization;
        doctor.availability = convertedAvailability;
        doctor.Bio = Bio;
        doctor.Experiance = Experiance;
        doctor.Phone_no = Phone_no;
        doctor.Counselling_fee = Counselling_fee;

        // Save the updated doctor information
        await doctor.save();
        console.log(doctor)
        res.status(200).json({ message: 'Doctor information updated successfully.', doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

router.post('/doctor', async (req, res) => {
    const userId = req.body.id;
    // const validUserId = mongoose.Types.ObjectId(userId);
    const user = await User.findOne({ _id: userId });
    console.log(user);
    const doctorId = user.doctor_profile;
    let doctor = await Doctor.findById(doctorId);

    res.status(200).json({ message: 'Doctor send.', doctor, user });

})
router.post('/user', async (req, res) => {
    const userId = req.body.id;
    // const validUserId = mongoose.Types.ObjectId(userId);
    const user = await User.findOne({ _id: userId });
    console.log(user);

    res.status(200).json({ message: 'Doctor send.', user });

})
router.post('/updatepharmacist', async (req, res) => {
    try {
        const pharmacistId = req.body.id;
        const {
            pharmacy_name,
            pharmacy_location,
            phone_number
        } = req.body;

        // Find the pharmacist by ID
        let pharmacist = await Pharmacist.findById(pharmacistId);
        if (!pharmacist) {
            return res.status(404).json({ error: 'Pharmacist not found.' });
        }

        // Update the pharmacist's information
        pharmacist.pharmacy_name = pharmacy_name;
        pharmacist.pharmacy_location = pharmacy_location;
        pharmacist.phone_number = phone_number;

        // Save the updated pharmacist information
        await pharmacist.save();

        res.status(200).json({ message: 'Pharmacist information updated successfully.', pharmacist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
    }
})

module.exports = router;
