import React, { useState } from "react";
import "./Modal.css";

const EditModal = ({ data, setData, onClose }) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setData((prevData) =>
      prevData.map((item) => (item.id === formData.id ? formData : item))
    );
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit</h2>
        <div className="edit-container">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="edit-field">
              <label>{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="close-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
