import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const data = [
    { id: 1, name: 'Dato X'},
    { id: 2, name: 'Dato X'},
    { id: 3, name: 'Dato X'},
    { id: 4, name: 'Dato X'},
    { id: 5, name: 'Dato X'},
    { id: 6, name: 'Dato X'},
  ];

  return (
    <div className="home-container">
      <h1 className="title">Datos de la Tabla</h1>

      {/* Botón para regresar a App */}
      <button className="back-button" onClick={() => navigate('/')}>Regresar a la tabla</button>

      {/* Cuadros de datos */}
      <div className="data-cards">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <h2 className="card-title">{item.name}</h2>
            <p className="card-info">ID: {item.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
