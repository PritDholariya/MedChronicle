const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
    {
        Doctor_id: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Doctor",
            required: true
        },
        Patient_id: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            required: true
        },
        slot: {
            type: String
        },
        Date_of_Appointment: Date,

        // Payment_id : {
        //     type : [mongoose.Schema.Types.ObjectId],
        //     ref : "Payment",
        //     required : true
        // },
        // Starting_time : {
        //     type : String,
        //     required : true
        // },
        // Ending_time : {
        //     type : String,
        //     required : true
        // },
        Day: {
            type: String,
            // required : true
        }
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Appointment", AppointmentSchema);