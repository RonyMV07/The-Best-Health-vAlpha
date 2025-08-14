import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';

const Weight = () => {
    const [formData, setFormData] = useState({
        weight: '',
        notes: ''
    });
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/weight', {
                    headers: { 'x-auth-token': token }
                });
                setRecords(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRecords();
    }, []);

    const { weight, notes } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post('http://localhost:5000/api/weight', formData, {
                headers: { 'x-auth-token': token }
            });
            setRecords([res.data, ...records]);
            setFormData({ weight: '', notes: '' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <h2>Módulo de Peso</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="number" name="weight" value={weight} onChange={onChange} placeholder="Peso (kg)" required />
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
                        <p>Peso: {record.weight} kg</p>
                        {record.notes && <p>Notas: {record.notes}</p>}
                        <p>Fecha: {new Date(record.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export default Weight;