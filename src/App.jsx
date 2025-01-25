import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
  const [newUser, setNewUser] = useState({
    full_name: '',
    role: '',
    level: '',
    department: '',
    location: '',
    assigned_account_or_clients: '',
    english_level: '',
    cv_link: '',
    tech_profile_1: '',
    entry_type: '',
    mt_entry_date: '',
    office_location: '',
    city_of_residence: '',
    time_zone: '',
    business_days_in_mt: '',
    mt_exit_projection_date: '',
    base_income_money: ''
  });
  
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterResidence, setFilterResidence] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);

  

  // GET users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://backend-production-429b.up.railway.app/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Error fetching data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cerrar el modal y limpiar el formulario
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null); // Limpiar el usuario que se estaba editando
    setViewingUser(null); // Limpiar el usuario que se estaba viendo
    setNewUser({
      full_name: '',
      role: '',
      level: '',
      department: '',
      location: '',
      assigned_account_or_clients: '',
      english_level: '',
      cv_link: '',
      tech_profile_1: '',
      entry_type: '',
      mt_entry_date: '',
      office_location: '',
      city_of_residence: '',
      time_zone: '',
      business_days_in_mt: '',
      mt_exit_projection_date: '',
      base_income_money: ''
    }); // Restablecer formulario
  };

  // POST user (add or update user)
  const handleAddOrUpdateUser = async () => {

    const { business_days_in_mt, base_income_money } = newUser;

  // Validar que 'business_days_in_mt' sea un número
  if (!Number.isInteger(Number(business_days_in_mt)) || business_days_in_mt < 0) {
    alert("El campo 'business_days_in_mt' debe ser un número entero positivo.");
    return;
  }

  // Validar que 'base_income_money' sea un número
  if (isNaN(Number(base_income_money)) || Number(base_income_money) <= 0) {
    alert("El campo 'base_income_money' debe ser un número válido mayor a 0.");
    return;
  }

    const userData = {
      full_name: newUser.full_name,
      role: newUser.role,
      level: newUser.level,
      department: newUser.department,
      location: newUser.location,
      assigned_account_or_clients: newUser.assigned_account_or_clients,
      english_level: newUser.english_level,
      cv_link: newUser.cv_link,
      tech_profile_1: newUser.tech_profile_1,
      entry_type: newUser.entry_type,
      mt_entry_date: newUser.mt_entry_date,
      office_location: newUser.office_location,
      city_of_residence: newUser.city_of_residence,
      time_zone: newUser.time_zone,
      business_days_in_mt: Number(business_days_in_mt), // Convertimos a número
      mt_exit_projection_date: newUser.mt_exit_projection_date,
      base_income_money: Number(base_income_money),
    };

    try {
      const response = editingUser
        ? await fetch(`https://backend-production-429b.up.railway.app/users/${editingUser.id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
            headers: {
              'Content-Type': 'application/json',
            },
          })
        : await fetch('https://backend-production-429b.up.railway.app/users/', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
              'Content-Type': 'application/json',
            },
          });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      

      const updatedUser = await response.json();
      if (editingUser) {
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      } else {
        setUsers((prevUsers) => [...prevUsers, updatedUser]);
      }

      setEditingUser(null); // Reset editing state
      setNewUser({
        full_name: '',
        role: '',
        level: '',
        department: '',
        location: '',
        assigned_account_or_clients: '',
        english_level: '',
        cv_link: '',
        tech_profile_1: '',
        entry_type: '',
        mt_entry_date: '',
        office_location: '',
        city_of_residence: '',
        time_zone: '',
        business_days_in_mt: '',
        mt_exit_projection_date: '',
        base_income_money: ''
      }); // Clear form
      alert("¡Usuario creado/actualizado con éxito!");
      setShowModal(false); // Close the modal after saving
    } catch (err) {
      alert("Hubo un problema al procesar la solicitud.");
      setError('Error saving user: ' + err.message);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  
    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  
    setUsers(sortedUsers);
  };
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // FETCH users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Open modal with user data for editing
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      full_name: user.full_name,
      role: user.role,
      level: user.level,
      department: user.department,
      location: user.location,
      assigned_account_or_clients: user.assigned_account_or_clients,
      english_level: user.english_level,
      cv_link: user.cv_link,
      tech_profile_1: user.tech_profile_1,
      entry_type: user.entry_type,
      mt_entry_date: user.mt_entry_date,
      office_location: user.office_location,
      city_of_residence: user.city_of_residence,
      time_zone: user.time_zone,
      business_days_in_mt: user.business_days_in_mt,
      mt_exit_projection_date: user.mt_exit_projection_date,
      base_income_money: user.base_income_money
    });
    setShowModal(true);
  };
    // Open modal to view user data
    const handleViewUser = (user) => {
      setViewingUser(user);
      setShowModal(true);
    };
  // DELETE user
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://backend-production-429b.up.railway.app/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Filtra los usuarios para eliminar el usuario eliminado de la lista
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError('Error deleting user: ' + err.message);
    }
  };

  return (
    <div className="container full-width">
      <header className="header">
  <h1>MindTeams</h1>
  <div className="filters-actions-container">
    <input
      type="text"
      placeholder="Search..."
      className="search-bar"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    
    <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
      <option value="">All Roles</option>
      {[...new Set(users.map((user) => user.role))].map((role) => (
        <option key={role} value={role}>{role}</option>
      ))}
    </select>

    <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
      <option value="">All Levels</option>
      {[...new Set(users.map((user) => user.level))].map((level) => (
        <option key={level} value={level}>{level}</option>
      ))}
    </select>

    <select value={filterResidence} onChange={(e) => setFilterResidence(e.target.value)}>
      <option value="">All Residences</option>
      {[...new Set(users.map((user) => user.city_of_residence))].map((city) => (
        <option key={city} value={city}>{city}</option>
      ))}
    </select>

    <button className="add-button" onClick={() => setShowModal(true)}>Add</button>
    <button className="import-button" onClick={() => setShowModal(true)}>Import Excel</button>
    
    
  </div>
</header>


      <div className="table-container full-width">
        <table className="full-width-table">
        <thead>
  <tr>
    <th>Status</th>
    <th onClick={() => handleSort('full_name')}>
      Full Name {sortConfig.key === 'full_name' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ' ↕'}
    </th>
    <th onClick={() => handleSort('role')}>
      Role {sortConfig.key === 'role' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ' ↕'}
    </th>
    <th onClick={() => handleSort('level')}>
      Level {sortConfig.key === 'level' ? (sortConfig.direction === 'asc' ? ' ↑' : ' ') : ' ↕'}
    </th>
    <th onClick={() => handleSort('city_of_residence')}>
      Residence {sortConfig.key === 'city_of_residence' ? (sortConfig.direction === 'asc' ? ' ↑' : ' 🔽') : ' ↕'}
    </th>
    <th onClick={() => handleSort('mt_entry_date')}>
      Entry Date {sortConfig.key === 'mt_entry_date' ? (sortConfig.direction === 'asc' ? ' ↑' : ' 🔽') : ' ↕'}
    </th>
    <th>Utilities</th>
  </tr>
</thead>

<tbody>
  {currentUsers
    .filter(user => 
      user.full_name?.toLowerCase().includes(search.toLowerCase()) &&
      (filterRole === '' || user.role === filterRole) &&
      (filterLevel === '' || user.level === filterLevel) &&
      (filterResidence === '' || user.city_of_residence === filterResidence)
    )
    .map(user => (
      user.full_name ? (
      <tr key={user.id}>
        <td>
          <input 
            type="checkbox" 
            checked={user.is_active_arkus} 
            disabled 
          />
        </td>
        <td 
          onClick={() => handleEditUser(user)}
          style={{ cursor: "pointer", color: "#333" }}
        >
          {user.full_name}
        </td>
        <td>{user.role}</td>
        <td>{user.level}</td>
        <td>{user.city_of_residence}</td>
        <td>{user.mt_entry_date}</td>
        <td>
          <button className="view-button" onClick={() => handleViewUser(user)}>View</button>
          <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
        </td>
      </tr>
    ) : null
    ))}
</tbody>
</table>

{/* Paginación */}
<div className="pagination">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Prev
  </button>

  {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
    <button
      key={i + 1}
      onClick={() => paginate(i + 1)}
      className={currentPage === i + 1 ? 'active' : ''}
    >
      {i + 1}
    </button>
  ))}

  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === Math.ceil(users.length / usersPerPage)}
  >
    Next
  </button>
</div>

      </div>

      {showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <h2>{viewingUser ? 'View User' : editingUser ? 'Edit User' : 'Add User'}</h2>
        <button className="close-button" onClick={handleCloseModal}>
          &times;
        </button>
      </div>

      {/* Vista de usuario */}
      {viewingUser ? (
        <div className="modal-content">
          {Object.entries(viewingUser).map(([key, value]) => (
            <div key={key} className="view-field">
              <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {value || 'N/A'}
            </div>
          ))}
        </div>
      ) : (
        // Formulario de edición o adición
        <div className="modal-form">
          {Object.keys(newUser).map((key) => (
            <div className="form-group" key={key}>
              <label>{key.replace(/_/g, ' ').toUpperCase()}</label>
              <input
                type={key.includes('date') ? 'date' : 'text'}
                name={key}
                value={newUser[key]}
                onChange={handleInputChange}
                placeholder={`Enter ${key.replace(/_/g, ' ').toLowerCase()}`}
              />
            </div>
          ))}
        </div>
      )}

      <div className="modal-actions">
        {!viewingUser && (
          <button className="save-button" onClick={handleAddOrUpdateUser}>
            Save
          </button>
        )}
        <button className="cancel-button" onClick={handleCloseModal}>
          {viewingUser ? 'Close' : 'Cancel'}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default App;
