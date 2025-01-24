import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

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

  // POST user (add or update user)
  const handleAddOrUpdateUser = async () => {
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
      business_days_in_mt: newUser.business_days_in_mt,
      mt_exit_projection_date: newUser.mt_exit_projection_date,
      base_income_money: newUser.base_income_money
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

      setShowModal(false); // Close the modal after saving
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
    } catch (err) {
      setError('Error saving user: ' + err.message);
    }
  };

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
        <div className="action-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="add-button" onClick={() => setShowModal(true)}>
            Add
          </button>
        </div>
      </header>

      <div className="table-container full-width">
        <table className="full-width-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Level</th>
              <th>Residence</th>
              <th>Entry Date</th>
              <th>Utilities</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.full_name.toLowerCase().includes(search.toLowerCase()))
              .map((user) => (
                <tr key={user.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{user.full_name}</td>
                  <td>{user.role}</td>
                  <td>{user.level}</td>
                  <td>{user.city_of_residence}</td>
                  <td>{user.mt_entry_date}</td>
                  <td>
                    <button
                      className="add-button"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button 
          className="delete-button" 
          onClick={() => handleDelete(user.id)}
        >
          Delete
        </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
              <button className="close-button" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-form">
              {/* Form fields */}
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
            <div className="modal-actions">
              <button className="save-button" onClick={handleAddOrUpdateUser}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
