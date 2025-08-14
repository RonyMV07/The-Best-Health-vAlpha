const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    activity: {
        type: String, // Ej: Correr, Nadar, Pesas
        required: true
    },
    duration: {
        type: Number, // Duración en minutos
        required: true
    },
    calories: {
        type: Number, // Calorías quemadas
    },
    notes: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);