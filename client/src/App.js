import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Heart from './components/Heart';
import Sleep from './components/Sleep';
import Exercise from './components/Exercise';
import Weight from './components/Weight';
import Medication from './components/Medication';
import Appointment from './components/Appointment';
import PrivateRoute from './routing/PrivateRoute';
import './App.css';

// Componente para la página principal
const Home = () => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Cargando...</div>;
  }

  // Redirige al usuario dependiendo si está autenticado o no
  return auth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Ruta privada para el dashboard */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="corazon" element={<Heart />} />
          <Route path="sueno" element={<Sleep />} />
          <Route path="ejercicio" element={<Exercise />} />
          <Route path="peso" element={<Weight />} />
          <Route path="medicacion" element={<Medication />} />
          <Route path="citas" element={<Appointment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;