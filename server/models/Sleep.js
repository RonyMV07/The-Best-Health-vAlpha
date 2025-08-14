const mongoose = require('mongoose');

const SleepSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    duration: {
        type: Number, // Duración en horas
        required: true
    },
    quality: {
        type: String, // 'Buena', 'Regular', 'Mala'
        enum: ['Buena', 'Regular', 'Mala'],
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

module.exports = mongoose.model('Sleep', SleepSchema);