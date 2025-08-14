const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Heart = require('../models/Heart');

// @route   POST /api/heart
// @desc    Crear un nuevo registro del corazón
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const newRecord = new Heart({
            user: req.user.id,
            pressure: req.body.pressure,
            saturation: req.body.saturation,
            cholesterol: req.body.cholesterol,
            triglycerides: req.body.triglycerides,
            notes: req.body.notes,
        });

        const record = await newRecord.save();
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   GET /api/heart
// @desc    Obtener todos los registros del corazón del usuario
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const records = await Heart.find({ user: req.user.id }).sort({ date: -1 });
        res.json(records);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   PUT /api/heart/:id
// @desc    Actualizar un registro del corazón
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let record = await Heart.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }

        // Asegurarse de que el usuario es el dueño del registro
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }

        record = await Heart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   DELETE /api/heart/:id
// @desc    Eliminar un registro del corazón
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const record = await Heart.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }

        // Asegurarse de que el usuario es el dueño del registro
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }

        await record.deleteOne();
        res.json({ msg: 'Registro eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;