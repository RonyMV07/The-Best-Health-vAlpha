const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Sleep = require('../models/Sleep');

// @route   POST /api/sleep
// @desc    Crear un nuevo registro de sueño
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const newRecord = new Sleep({
            user: req.user.id,
            duration: req.body.duration,
            quality: req.body.quality,
            notes: req.body.notes,
        });

        const record = await newRecord.save();
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   GET /api/sleep
// @desc    Obtener todos los registros de sueño del usuario
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const records = await Sleep.find({ user: req.user.id }).sort({ date: -1 });
        res.json(records);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   PUT /api/sleep/:id
// @desc    Actualizar un registro de sueño
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let record = await Sleep.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }

        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }

        record = await Sleep.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   DELETE /api/sleep/:id
// @desc    Eliminar un registro de sueño
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const record = await Sleep.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }

        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }

        await record.deleteOne();
        res.json({ msg: 'Registro de sueño eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;