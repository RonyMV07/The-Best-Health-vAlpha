const mongoose = require('mongoose');

const HeartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pressure: {
        type: String,
        required: true
    },
    saturation: {
        type: Number,
        required: true
    },
    cholesterol: {
        type: Number,
        default: 0
    },
    triglycerides: {
        type: Number,
        default: 0
    },
    notes: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Heart', HeartSchema);