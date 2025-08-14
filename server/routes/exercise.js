const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Exercise = require('../models/Exercise');

// @route   POST /api/exercise
// @desc    Crear un nuevo registro de ejercicio
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const newRecord = new Exercise({
            user: req.user.id,
            activity: req.body.activity,
            duration: req.body.duration,
            calories: req.body.calories,
            notes: req.body.notes,
        });

        const record = await newRecord.save();
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   GET /api/exercise
// @desc    Obtener todos los registros de ejercicio del usuario
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const records = await Exercise.find({ user: req.user.id }).sort({ date: -1 });
        res.json(records);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   PUT /api/exercise/:id
// @desc    Actualizar un registro de ejercicio
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        let record = await Exercise.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }
        record = await Exercise.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

// @route   DELETE /api/exercise/:id
// @desc    Eliminar un registro de ejercicio
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const record = await Exercise.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ msg: 'Registro no encontrado' });
        }
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }
        await record.deleteOne();
        res.json({ msg: 'Registro de ejercicio eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;