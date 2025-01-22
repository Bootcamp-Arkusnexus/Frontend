import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const App = () => {
  const [data] = useState([
    { id: 1, name: 'De anda', age: 27 },
    { id: 2, name: 'Gael', age: 21 },
    { id: 3, name: 'Lalo', age: 29 },
  ]);
  const [search, setSearch] = useState('');
  const [filterAge, setFilterAge] = useState('');

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterAge ? item.age == filterAge : true)
  );

  return (
    <div className="app-container">
      <h1 className="title">Tablon</h1>

      {/* Barra de búsqueda y filtro */}
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Filtrar por edad"
          className="filter-input"
          value={filterAge}
          onChange={(e) => setFilterAge(e.target.value)}
        />
      </div>

      {/* Botones */}
      <div className="crud-buttons">
        <button className="crud-button">Crear</button>
        <button className="crud-button">Leer</button>
        <button className="crud-button">Actualizar</button>
        <button className="crud-button">Eliminar</button>
      </div>

      {/* Tabla */}
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Boton Home.js */}
      <div className="navigation-button">
        <Link to="/home">
          <button className="crud-button">Ir a Home</button>
        </Link>
      </div>
    </div>
  );
};

export default App;
