// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Aquí puedes agregar más campos si los necesitas en el futuro
});

module.exports = mongoose.model('User', UserSchema);