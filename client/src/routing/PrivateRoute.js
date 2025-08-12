import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
    const { auth, loading } = useContext(AuthContext);
    
    if (loading) {
        return <div>Cargando...</div>; // O cualquier spinner que quieras usar
    }

    // `auth` es null si no hay token o si la validación falla
    // `auth` tiene un valor si el usuario esta logueado
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;