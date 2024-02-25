const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Doctor = require("../models/doctorModel");
const Pharmacist = require("../models/pharmacistModel");
const Prescription = require("../models/prescriptionModel");
const mongoose = require("mongoose");

router.post("/add", async (req, res) => {
  try {
    const { prescription, userid, doctorid } = req.body;
    prescription.patient_id = userid;
    prescription.doctor_id = doctorid;
    console.log("hii");

    // Create a new user based on the type
    let newPrescription = new Prescription(prescription);

    await newPrescription.save();
    res.status(201).json({ username: newPrescription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});

router.post("/activemedication", async (req, res) => {
  try {
    const { patientid } = req.body;

    console.log(patientid);

    const prescriptions = await Prescription.find({
        patient_id: patientid,
        "medications.duration_completed": false,
    })
    .sort({ created_at: -1 });

    // Extract and return the medications
    const medicationsArrays = [];
    for (const prescription of prescriptions) {
      const medicationsArray = prescription.medications;

      // Using an inner for loop to iterate over each medication within a prescription
      
      for (const medication of medicationsArray) {
        medicationsArrays.push(medication);
      }

    }

    console.log(medicationsArrays);
    res.status(201).json({ medication: medicationsArrays });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});

// const getActiveMedications = async (patientId) => {
//     try {
//       // Find prescriptions for the specified patient with duration_completed set to true
//       const prescriptions = await Prescription.find({
//         patient_id: patientId,
//         'medications.duration_completed': true,
//       });

//       // Extract and return the medications
//       const medications = prescriptions.flatMap((prescription) =>
//         prescription.medications.filter((medication) => medication.duration_completed)
//       );

//       return medications;
//     } catch (error) {
//       console.error('Error fetching completed medications:', error);
//       throw error;
//     }
//   };

module.exports = router;
