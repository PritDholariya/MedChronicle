const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    specialization: String,
    availability: [
        {
            day: String, // e.g., 'Monday', 'Tuesday', etc.
            slots: [
                {
                    time: String, // Time slot, e.g., '10:00 AM - 12:00 PM'
                    isBooked: { type: Boolean, default: false } // Indicates whether this slot is booked or not
                }
            ]
        }
    ],
    Bio : String,
    Experiance : {
        type : Number,
    },
    Phone_no : {
        type : Number,
        // required : true
    },
    Counselling_fee : {
        type : Number,
        // required : true
    },
});

module.exports = mongoose.model('Doctor', doctorSchema);
