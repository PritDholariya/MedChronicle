const mongoose = require('mongoose');

const pharmacistSchema = new mongoose.Schema({
    // user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    pharmacy_name: { type: String },
    pharmacy_location: String,
    phone_number : String,
});

module.exports = mongoose.model('Pharmacist', pharmacistSchema);
