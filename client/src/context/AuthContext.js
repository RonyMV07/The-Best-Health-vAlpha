import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    // Revisa si hay un token en el localStorage al cargar la app
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Si hay un token, verifica que sea válido con el backend
            axios.defaults.headers.common['x-auth-token'] = token;
            // Aquí puedes agregar una llamada al backend para validar el token y obtener datos del usuario
            // Por ahora, asumimos que es válido si existe
            setAuth({ token });
        }
        setLoading(false);
    }, []);

    // Función para iniciar sesión
    const login = async (email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ email, password });
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', body, config);
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;
            setAuth({ token: res.data.token });
            return true;
        } catch (err) {
            console.error(err.response.data.msg);
            return false;
        }
    };

    // Función para registrarse
    const register = async (name, email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ name, email, password });
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', body, config);
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;
            setAuth({ token: res.data.token });
            return true;
        } catch (err) {
            console.error(err.response.data.msg);
            return false;
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, loading, login, register, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };