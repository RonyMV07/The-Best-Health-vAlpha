const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Medication = require('../models/Medication');

// @route   POST /api/medication
// @desc    Crear un nuevo registro de medicación
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const newRecord = new Medication({
            user: req.user.id,
            name: req.body.name,
            dosage: req.body.dosage,
            frequency: req.body.frequency,
            notes: req.body.notes,
        });

        const record = await newRecord.save();
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   GET /api/medication
// @desc    Obtener todos los registros de medicación del usuario
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const records = await Medication.find({ user: req.user.id }).sort({ date: -1 });
        res.json(records);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   PUT /api/medication/:id
// @desc    Actualizar un registro de medicación
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let record = await Medication.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }
        record = await Medication.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   DELETE /api/medication/:id
// @desc    Eliminar un registro de medicación
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const record = await Medication.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }
        await record.deleteOne();
        res.json({ msg: 'Registro de medicación eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;