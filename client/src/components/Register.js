import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) {
      navigate('/dashboard'); // Redirige al dashboard después del registro
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={onSubmit}>
        {/* ... (el resto del formulario es igual) ... */}
        <div>
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
        <input type="submit" value="Registrarse" />
      </form>
    </div>
  );
};

export default Register;