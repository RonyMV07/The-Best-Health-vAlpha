import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';

const Sleep = () => {
    const [formData, setFormData] = useState({
        duration: '',
        quality: '',
        notes: ''
    });
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/sleep');
                setRecords(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRecords();
    }, []);

    const { duration, quality, notes } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/sleep', formData);
            setRecords([res.data, ...records]);
            setFormData({ duration: '', quality: '', notes: '' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <h2>Módulo de Sueño</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="number" name="duration" value={duration} onChange={onChange} placeholder="Duración (horas)" required />
                </div>
                <div>
                    <select name="quality" value={quality} onChange={onChange} required>
                        <option value="">Selecciona la Calidad</option>
                        <option value="Buena">Buena</option>
                        <option value="Regular">Regular</option>
                        <option value="Mala">Mala</option>
                    </select>
                </div>
                <div>
                    <textarea name="notes" value={notes} onChange={onChange} placeholder="Notas adicionales"></textarea>
                </div>
                <button type="submit">Guardar Registro</button>
            </form>
            
            <h3>Mis Registros</h3>
            <ul>
                {records.map(record => (
                    <li key={record._id}>
                        <p>Duración: {record.duration} horas</p>
                        <p>Calidad: {record.quality}</p>
                        {record.notes && <p>Notas: {record.notes}</p>}
                        <p>Fecha: {new Date(record.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export default Sleep;