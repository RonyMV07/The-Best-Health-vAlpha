import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
const { logout } = useContext(AuthContext);

  // Aquí obtendremos el nombre del usuario en el futuro. Por ahora, es un placeholder.
const userName = 'Usuario Ejemplo'; 

return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: 'darkgray' }}>
    <h3>Nombre del Módulo</h3>
    <h3>{userName}</h3>
    <button onClick={logout}>Cerrar Sesión</button>
    </div>
);
};

export default Navbar;