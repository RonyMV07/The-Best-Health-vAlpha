// client/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const body = JSON.stringify({ name, email, password });
      const res = await axios.post('http://localhost:5000/api/auth/register', body, config);
      console.log(res.data.token);
      // TODO: Guardar el token y redirigir
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={onSubmit}>
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