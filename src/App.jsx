import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({
    full_name: "",
    role: "",
    level: "",
  });

  // GET users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://backend-production-c3c1.up.railway.app/users"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // POST user
  const handleAddUser = async () => {
    const userData = {
      full_name: newUser.full_name,
      role: newUser.role,
      level: newUser.level,
    };

    try {
      const response = await fetch(
        "https://backend-production-429b.up.railway.app/users",
        {
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newUserData = await response.json();

      setUsers((prevUsers) => [...prevUsers, newUserData]);

      // Clear form
      setNewUser({
        full_name: "",
        role: "",
        level: "",
      });
    } catch (err) {
      setError("Error adding user: " + err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // FETCH
  useEffect(() => {
    fetchUsers();
  }, []);

  // DELETE user
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://backend-production-c3c1.up.railway.app/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError("Error deleting user: " + err.message);
    }
  };

  // EDIT user
  const handleEdit = (id) => {
    alert(`Editar usuario con ID: ${id}`);
  };

  // VIEW user
  const handleView = (id) => {
    alert(`Ver detalles del usuario con ID: ${id}`);
  };

  return (
    <div>
      <h1>Users</h1>

      <div>
        <h2>Add New User</h2>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={newUser.full_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={newUser.role}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="level"
          placeholder="Level"
          value={newUser.level}
          onChange={handleInputChange}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.full_name}</td>
              <td>{user.role}</td>
              <td>{user.level}</td>
              <td>
                <button onClick={() => handleView(user.id)}>View</button>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
