const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    type: String,
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_photo: String,
    dob: Date,
});

module.exports = mongoose.model('user', userSchema);