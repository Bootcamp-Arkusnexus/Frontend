import React, { useState, useEffect } from "react";
import { fetchUsersApi, addUserApi, updateUserApi, deleteUserApi } from "./services/api";
import { Filters } from "./components/Filters";
import { UserList } from "./components/UserList";
import { UserForm } from "./components/UserForm";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import './styles/App.css';
import './styles/Buttons.css';
import { Pagination } from "./components/Pagination";

const App = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [filterRole, setFilterRole] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterResidence, setFilterResidence] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchUsersApi();
        setUsers(data);
        setTotalPages(Math.ceil(data.length / usersPerPage));
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (userData) => {
    try {
      await addUserApi(userData);
      const updatedUsers = await fetchUsersApi();
      setUsers(updatedUsers);
      setModalOpen(false);
      alert("User added successfully!");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditUser = async (userData) => {
    try {
      const updatedUser = await updateUserApi(userData.id, userData);
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setModalOpen(false);
          alert("User updated successfully!");
    } catch (error) {
      console.error(error.message);
      alert("Error updating user.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserApi(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error.message);
    }
  };

  const openAddModal = () => {
    setSelectedUser(null);
    setModalMode("add");
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setModalMode("edit");
    setModalOpen(true);
  };

  const openViewModal = (user) => {
    setSelectedUser(user);
    setModalMode("view");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user => {
  const matchSearch = user.full_name.toLowerCase().includes(search.toLowerCase()) ||
                      user.role.toLowerCase().includes(search.toLowerCase()) ||
                      user.level.toLowerCase().includes(search.toLowerCase()) ||
                      user.city_of_residence.toLowerCase().includes(search.toLowerCase());
  const matchRole = filterRole === "" || user.role === filterRole;
  const matchLevel = filterLevel === "" || user.level === filterLevel;
  const matchResidence = filterResidence === "" || user.city_of_residence === filterResidence;
  return matchSearch && matchRole && matchLevel && matchResidence;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="header-container">
        <Header search={search} setSearch={setSearch} />
        <button className="add-button" onClick={openAddModal}>
          Add
        </button>
      </div>

      <Filters
        users={users}
        filterRole={filterRole}
        setFilterRole={setFilterRole}
        filterLevel={filterLevel}
        setFilterLevel={setFilterLevel}
        filterResidence={filterResidence}
        setFilterResidence={setFilterResidence}
      />

      <UserList
        users={currentUsers}
        onEdit={openEditModal}
        onView={openViewModal}
        onDelete={handleDeleteUser}
      />

      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={filteredUsers.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}
      title={modalMode === "add" ? "Add New User" : modalMode === "edit" ? "Edit User" : "View User"}>
        <UserForm
          user={modalMode === "add" ? {} : selectedUser}
          onSubmit={modalMode === "add" ? handleAddUser : handleEditUser}
          onClose={closeModal}
          isOpen={isModalOpen}
          isDisabled={modalMode === "view"}
          modalMode={modalMode}
        />
      </Modal>
    </div>
  );
};

export default App;
