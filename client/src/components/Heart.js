import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';

const Heart = () => {
    const [formData, setFormData] = useState({
        pressure: '',
        saturation: '',
        cholesterol: '',
        triglycerides: '',
        notes: ''
    });
    const [records, setRecords] = useState([]);
    
    // Obtener los registros al cargar el componente
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/heart');
                setRecords(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRecords();
    }, []);

    const { pressure, saturation, cholesterol, triglycerides, notes } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/heart', formData);
            setRecords([res.data, ...records]);
            setFormData({
                pressure: '',
                saturation: '',
                cholesterol: '',
                triglycerides: '',
                notes: ''
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <h2>Módulo de Salud del Corazón</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" name="pressure" value={pressure} onChange={onChange} placeholder="Presión Arterial" required />
                </div>
                <div>
                    <input type="number" name="saturation" value={saturation} onChange={onChange} placeholder="Saturación de Oxígeno" required />
                </div>
                <div>
                    <input type="number" name="cholesterol" value={cholesterol} onChange={onChange} placeholder="Colesterol" />
                </div>
                <div>
                    <input type="number" name="triglycerides" value={triglycerides} onChange={onChange} placeholder="Triglicéridos" />
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
                        <p>Presión: {record.pressure}</p>
                        <p>Saturación: {record.saturation}</p>
                        {record.cholesterol && <p>Colesterol: {record.cholesterol}</p>}
                        {record.triglycerides && <p>Triglicéridos: {record.triglycerides}</p>}
                        {record.notes && <p>Notas: {record.notes}</p>}
                        <p>Fecha: {new Date(record.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export default Heart;