const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

// @route   POST /api/appointment
// @desc    Crear una nueva cita médica
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const newRecord = new Appointment({
            user: req.user.id,
            doctor: req.body.doctor,
            specialty: req.body.specialty,
            date: req.body.date,
            notes: req.body.notes,
        });

        const record = await newRecord.save();
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   GET /api/appointment
// @desc    Obtener todas las citas médicas del usuario
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const records = await Appointment.find({ user: req.user.id }).sort({ date: -1 });
        res.json(records);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   PUT /api/appointment/:id
// @desc    Actualizar una cita médica
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let record = await Appointment.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }
        record = await Appointment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   DELETE /api/appointment/:id
// @desc    Eliminar una cita médica
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const record = await Appointment.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }
        await record.deleteOne();
        res.json({ msg: 'Cita médica eliminada' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;