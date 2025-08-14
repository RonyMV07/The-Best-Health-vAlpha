const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Weight = require('../models/Weight');

// @route   POST /api/weight
// @desc    Crear un nuevo registro de peso
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const newRecord = new Weight({
            user: req.user.id,
            weight: req.body.weight,
            notes: req.body.notes,
        });

        const record = await newRecord.save();
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   GET /api/weight
// @desc    Obtener todos los registros de peso del usuario
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const records = await Weight.find({ user: req.user.id }).sort({ date: -1 });
        res.json(records);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   PUT /api/weight/:id
// @desc    Actualizar un registro de peso
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let record = await Weight.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }
        record = await Weight.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   DELETE /api/weight/:id
// @desc    Eliminar un registro de peso
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const record = await Weight.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }
        await record.deleteOne();
        res.json({ msg: 'Registro de peso eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;