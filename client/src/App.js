import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // Importa el Dashboard
import PrivateRoute from './routing/PrivateRoute'; // Importa la PrivateRoute
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>The Best Health</h1>
        <nav>
          <Link to="/">Inicio</Link> | <Link to="/login">Iniciar Sesión</Link> | <Link to="/register">Registrarse</Link>
        </nav>
        <Routes>
          {/* Ruta Pública para Login y Register */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Esta es la ruta protegida */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;