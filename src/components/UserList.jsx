import React, { useState } from "react";
import '../styles/App.css';

export const UserList = ({ users, onEdit, onDelete, onView }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  // Función para ordenar los datos
  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  // Función para manejar el cambio de orden
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th onClick={() => requestSort('is_active_mind')}>Status Mind Teams</th>
          <th onClick={() => requestSort('full_name')}>Full Name</th>
          <th onClick={() => requestSort('role')}>Role</th>
          <th onClick={() => requestSort('level')}>Level</th>
          <th onClick={() => requestSort('city_of_residence')}>Residence</th>
          <th onClick={() => requestSort('mt_entry_date')}>Entry date</th>
          <th>Utilities</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id} style={{ cursor: 'pointer' }}>
            <td>
              <input
                type="checkbox"
                checked={user.is_active_mind}
                readOnly
                disabled
              />
            </td>
            <td onClick={() => onEdit(user)}>{user.full_name}</td>
            <td onClick={() => onEdit(user)}>{user.role}</td>
            <td onClick={() => onEdit(user)}>{user.level}</td>
            <td onClick={() => onEdit(user)}>{user.city_of_residence}</td>
            <td onClick={() => onEdit(user)}>{formatDate(user.mt_entry_date)}</td>
            <td>
              <button onClick={() => onView(user)}>View</button>
              <button onClick={() => onDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
