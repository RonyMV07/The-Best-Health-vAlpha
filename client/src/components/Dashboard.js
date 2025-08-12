import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
const { logout } = useContext(AuthContext);

return (
    <div>
    <h2>Bienvenido al Dashboard de The Best Health</h2>
    <p>¡Has iniciado sesión con éxito!</p>
    <button onClick={logout}>Cerrar Sesión</button>
    <Link to="/">Ir a la página principal</Link>
    </div>
);
};

export default Dashboard;