import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';  // Componente de la tabla
import Home from './Home'; // Componente de inicio

const Main = () => {
  return (
    <Router>  {/* Se configura el Router */}
      <Routes> {/* Definimos las rutas aquí */}
        <Route path="/" element={<App />} /> {/* Ruta principal, muestra App.js */}
        <Route path="/home" element={<Home />} /> {/* Ruta "/home", muestra Home.js */}
      </Routes>
    </Router>
  );
};

export default Main;
