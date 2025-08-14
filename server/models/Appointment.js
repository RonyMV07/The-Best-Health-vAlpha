const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    doctor: {
        type: String,
        required: true
    },
    specialty: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);