import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';

const Medication = () => {
    const [formData, setFormData] = useState({
        name: '',
        dosage: '',
        frequency: '',
        notes: ''
    });
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/medication', {
                    headers: { 'x-auth-token': token }
                });
                setRecords(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRecords();
    }, []);

    const { name, dosage, frequency, notes } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post('http://localhost:5000/api/medication', formData, {
                headers: { 'x-auth-token': token }
            });
            setRecords([res.data, ...records]);
            setFormData({ name: '', dosage: '', frequency: '', notes: '' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <h2>Módulo de Medicación</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" name="name" value={name} onChange={onChange} placeholder="Nombre del medicamento" required />
                </div>
                <div>
                    <input type="text" name="dosage" value={dosage} onChange={onChange} placeholder="Dosis (ej. 10 mg)" required />
                </div>
                <div>
                    <input type="text" name="frequency" value={frequency} onChange={onChange} placeholder="Frecuencia (ej. cada 8 horas)" required />
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
                        <p>Medicación: {record.name}</p>
                        <p>Dosis: {record.dosage}</p>
                        <p>Frecuencia: {record.frequency}</p>
                        {record.notes && <p>Notas: {record.notes}</p>}
                        <p>Fecha: {new Date(record.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export default Medication;