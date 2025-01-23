import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import DetailsModal from "./DetailsModal";
import EditModal from "./EditModal";

const App = () => {
  const [data, setData] = useState([
    {
      id: 1, active: true, name: "Abendaño López Luis Francisco", role: "DEV", level: "Mid",
      team: "Mind Teams", recurrence: 1, cv: "Link CV", techProfile: "Php",
      entryType: "Reclutamiento", entryDate: "07/22/2024", exitDate: "04/09/2024",
      workDays: 33, office: "AGS", city: "Aguascalientes", timezone: "CDT",
      assignedClient: "Wellt", englishLevel: "B2 / 8", projectedExitDate: "08/31/2024",
      baseSalary: "$10,000.00", techProfile2: "Certificado MT", companyExitType: "Angular",
      companyExitDate: "N/A", entryDetails: "Ileana"
    },
    {
      id: 2, active: false, name: "Abraham Alonso Velázquez", role: "DEV", level: "Sr",
      team: "Mind Teams", recurrence: 1, cv: "Link CV", techProfile: "Android",
      entryType: "Reclutamiento", entryDate: "02/24/2020", exitDate: "07/17/2022",
      workDays: 103, office: "MTY", city: "Monterrey", timezone: "CDT",
      assignedClient: "Branded Online", englishLevel: "B2 / 8", projectedExitDate: "07/17/2022",
      baseSalary: "$15,000.00", techProfile2: "No Validado", companyExitType: "No voluntaria",
      companyExitDate: "07/17/2020", entryDetails: "Poala"
    }
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openDetailsModal = (row) => {
    setSelectedRow(row);
    setIsDetailsOpen(true);
  };

  const openEditModal = (row) => {
    setSelectedRow(row);
    setIsEditOpen(true);
  };

  const closeModals = () => {
    setIsDetailsOpen(false);
    setIsEditOpen(false);
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="app-container">
      <h1 className="title">Dashboard</h1>

      {/* Barra de búsqueda y CRUD */}
      <div className="top-bar">
        <div className="filters">
          <input
            type="text"
            placeholder="Search by Name"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by Role"
            className="filter-input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div className="crud-buttons">
          <button className="crud-button">Create</button>
          <button className="crud-button">Update</button>
          <button className="crud-button">Import</button>
          <button className="crud-button">Export</button>
        </div>
      </div>

      {/* Tabla */}
      <table className="styled-table">
        <thead>
          <tr>
            <th>Active / Inactive</th>
            <th>Name</th>
            <th>Role</th>
            <th>Level</th>
            <th>Office</th>
            <th>Client Assigned</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
            .filter((item) => item.role.toLowerCase().includes(filter.toLowerCase()))
            .map((item) => (
              <tr key={item.id}>
                <td className="checkbox-column">
                  <input type="checkbox" checked={item.active} disabled />
                </td>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td>{item.level}</td>
                <td>{item.office}</td>
                <td>{item.assignedClient}</td>
                <td className="actions-column">
                  <div className="action-buttons-container">
                    <button className="action-button" onClick={() => openDetailsModal(item)}>Details</button>
                    <button className="action-button" onClick={() => openEditModal(item)}>Edit</button>
                    <button className="action-button delete" onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modales */}
      {isDetailsOpen && <DetailsModal data={selectedRow} onClose={closeModals} />}
      {isEditOpen && <EditModal data={selectedRow} setData={setData} onClose={closeModals} />}
      
      <div className="navigation-button">
        <Link to="/home">
          <button className="crud-button">Go to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default App;
