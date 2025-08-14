import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import axios from 'axios';

const Appointment = () => {
    const [formData, setFormData] = useState({
        doctor: '',
        specialty: '',
        date: '',
        notes: ''
    });
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/appointment', {
                    headers: { 'x-auth-token': token }
                });
                setRecords(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRecords();
    }, []);

    const { doctor, specialty, date, notes } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post('http://localhost:5000/api/appointment', formData, {
                headers: { 'x-auth-token': token }
            });
            setRecords([res.data, ...records]);
            setFormData({ doctor: '', specialty: '', date: '', notes: '' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <h2>Módulo de Citas Médicas</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" name="doctor" value={doctor} onChange={onChange} placeholder="Nombre del doctor" required />
                </div>
                <div>
                    <input type="text" name="specialty" value={specialty} onChange={onChange} placeholder="Especialidad" />
                </div>
                <div>
                    <input type="datetime-local" name="date" value={date} onChange={onChange} required />
                </div>
                <div>
                    <textarea name="notes" value={notes} onChange={onChange} placeholder="Notas adicionales"></textarea>
                </div>
                <button type="submit">Guardar Cita</button>
            </form>
            
            <h3>Mis Citas</h3>
            <ul>
                {records.map(record => (
                    <li key={record._id}>
                        <p>Doctor: {record.doctor}</p>
                        {record.specialty && <p>Especialidad: {record.specialty}</p>}
                        <p>Fecha: {new Date(record.date).toLocaleDateString()} - {new Date(record.date).toLocaleTimeString()}</p>
                        {record.notes && <p>Notas: {record.notes}</p>}
                    </li>
                ))}
            </ul>
        </Layout>
    );
};

export default Appointment;