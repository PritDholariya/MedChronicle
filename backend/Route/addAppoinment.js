const express = require('express');
const router = express.Router();
const Appointment = require('../models/appoinmentModel');

// POST endpoint to create a new appointment
router.post('/appointments', async (req, res) => {
    try {
        // Extract data from the request body
        const { Doctor_id, Patient_id, slot, Date_of_Appointment, Day } = req.body;

        // Create a new appointment object
        const appointment = new Appointment({
            Doctor_id,
            Patient_id,
            slot,
            Date_of_Appointment,
            Day
        });

        // Save the appointment to the database
        await appointment.save();

        // Return a success response
        return res.status(201).json({ success: true, message: 'Appointment created successfully', appointment });
    } catch (error) {
        // Return an error response if there's an issue creating the appointment
        console.error('Error creating appointment:', error);
        return res.status(500).json({ success: false, message: 'Could not create appointment', error: error.message });
    }
});

router.post('/allappoitment', async (req, res) => {
    try {
        const { doctorId } = req.body;
        // console.log(req)
        console.log("dofodfi " + doctorId)
        // Find all appointments with    the given doctor ID
        const appointments = await Appointment.find({ Doctor_id: doctorId });

        // Return the appointments
        return res.status(200).json({ success: true, appointments });
    } catch (error) {
        // Return an error response if there's an issue
        console.error('Error finding appointments:', error);
        return res.status(500).json({ success: false, message: 'Could not retrieve appointments', error: error.message });
    }
});
module.exports = router;
