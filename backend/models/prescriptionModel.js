const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    medications: [
        {
            name: { type: String },
            dosage: { type: String },
            // frequency: { type: String, required: true }, // Frequency of medication (e.g., 'once a day', 'twice a day')
            times: [String], // Array of times when the medication should be taken
            duration_completed: { type: Boolean, default: false } // Indicates whether the medication duration is completed
            // Add any other fields related to medications
        }
    ],
    instructions: String,
    created_at: { type: Date, default: Date.now }, // Timestamp representing when the prescription is added
    // Add any other fields related to prescriptions
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
