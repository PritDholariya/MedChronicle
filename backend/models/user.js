const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    type: { type: String, enum: ['patient', 'doctor', 'pharmacist'], required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_photo: String,
    dob: Date,
    doctor_profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    pharmacist_profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacist' },
    qr_code: String,
    weight: Number
});

module.exports = mongoose.model('User', userSchema);
