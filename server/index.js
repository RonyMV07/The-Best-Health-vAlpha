// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas de autenticación
app.use('/api/auth', require('./routes/auth'));
app.use('/api/heart', require('./routes/heart'));
app.use('/api/sleep', require('./routes/sleep'));
app.use('/api/exercise', require('./routes/exercise'));
app.use('/api/weight', require('./routes/weight'));
app.use('/api/medication', require('./routes/medication'));
app.use('/api/appointment', require('./routes/appointment'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));