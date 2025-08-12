import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard'); // Redirige al dashboard después de iniciar sesión
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={onSubmit}>
        {/* ... (el resto del formulario es igual) ... */}
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" value="Iniciar Sesión" />
      </form>
    </div>
  );
};

export default Login;