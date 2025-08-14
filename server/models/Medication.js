const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    dosage: {
        type: String, // Ej: "10 mg", "5 ml"
        required: true
    },
    frequency: {
        type: String, // Ej: "Una vez al día", "Cada 8 horas"
        required: true
    },
    notes: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Medication', MedicationSchema);