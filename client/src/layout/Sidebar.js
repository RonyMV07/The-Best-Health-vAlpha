import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
return (
    <div style={{ width: '200px', height: '100vh', backgroundColor: 'lightgray' }}>
    <ul>
        <li><Link to="/corazon">Salud (Corazón)</Link></li>
        <li><Link to="/sueno">Sueño (Luna)</Link></li>
        <li><Link to="/ejercicio">Ejercicio (Muñeco corriendo)</Link></li>
        <li><Link to="/peso">Peso (Manzana)</Link></li>
        <li><Link to="/medicacion">Medicacion (Pildora)</Link></li>
        <li><Link to="/citas">Citas Medicas (Agenda)</Link></li>
    </ul>
    </div>
);
};

export default Sidebar;