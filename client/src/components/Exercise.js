import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';

const Exercise = () => {
    const [formData, setFormData] = useState({
        activity: '',
        duration: '',
        calories: '',
        notes: ''
    });
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            // Get the token from localStorage
            const token = localStorage.getItem('token');
            try {
                // Add the token to the request headers
                const res = await axios.get('http://localhost:5000/api/exercise', {
                    headers: { 'x-auth-token': token }
                });
                setRecords(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRecords();
    }, []);

    const { activity, duration, calories, notes } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        try {
            // Add the token to the request headers
            const res = await axios.post('http://localhost:5000/api/exercise', formData, {
                headers: { 'x-auth-token': token }
            });
            setRecords([res.data, ...records]);
            setFormData({ activity: '', duration: '', calories: '', notes: '' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <h2>Módulo de Ejercicio</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" name="activity" value={activity} onChange={onChange} placeholder="Actividad" required />
                </div>
                <div>
                    <input type="number" name="duration" value={duration} onChange={onChange} placeholder="Duración (minutos)" required />
                </div>
                <div>
                    <input type="number" name="calories" value={calories} onChange={onChange} placeholder="Calorías quemadas" />
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
                        <p>Actividad: {record.activity}</p>
                        <p>Duración: {record.duration} minutos</p>
                        {record.calories && <p>Calorías: {record.calories}</p>}
                        {record.notes && <p>Notas: {record.notes}</p>}
                        <p>Fecha: {new Date(record.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export default Exercise;