import React, { useState, useEffect } from "react";
import '../styles/Buttons.css';
import '../styles/Modal.css';


export const UserForm = ({ user, onSubmit, onClose, isOpen, isDisabled, modalMode }) => {

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleInputChange = (e) => {
        if (!isDisabled) {
        const { name, type, checked, value } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }
    };

  const handleSubmit = (e) => {
        e.preventDefault();
        if (!isDisabled) {
            onSubmit(formData);
        }
    };

    if (!isOpen) return null;

  return (
    <div>
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-group">
          <label style={{ color: 'black' }}>
            Status MindTeams
            <input
              type="checkbox"
              name="is_active_mind"
              checked={formData.is_active_mind || false}
              onChange={handleInputChange}
              disabled={isDisabled}
            />
          </label>
        </div>
      <input
        required
        type="text"
        id="full_name"
        name="full_name"
        placeholder="Full Name"
        value={formData.full_name || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        required
        type="text"
        id="role"
        name="role"
        placeholder="Role"
        value={formData.role || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="text"
        id="level"
        name="level"
        placeholder="Level"
        value={formData.level || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="text"
        id="department"
        name="department"
        placeholder="Department"
        value={formData.department || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="text"
        id="location"
        name="location"
        placeholder="Location"
        value={formData.location || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="text"
        id="assigned_account_or_clients"
        name="assigned_account_or_clients"
        placeholder="Assigned Account or Clients"
        value={formData.assigned_account_or_clients || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="text"
        id="english_level"
        name="english_level"
        placeholder="English Level"
        value={formData.english_level || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="text"
        id="cv_link"
        name="cv_link"
        placeholder="CV Link"
        value={formData.cv_link || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="text"
        id="tech_profile_1"
        name="tech_profile_1"
        placeholder="Tech Profile 1"
        value={formData.tech_profile_1 || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="text"
        id="entry_type"
        name="entry_type"
        placeholder="Entry Type"
        value={formData.entry_type || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="date"
        id="mt_entry_date"
        name="mt_entry_date"
        value={formData.mt_entry_date || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="text"
        id="office_location"
        name="office_location"
        placeholder="Office Location"
        value={formData.office_location || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="text"
        id="city_of_residence"
        name="city_of_residence"
        placeholder="City of Residence"
        value={formData.city_of_residence || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="text"
        id="time_zone"
        name="time_zone"
        placeholder="Time Zone"
        value={formData.time_zone || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="number"
        id="business_days_in_mt"
        name="business_days_in_mt"
        placeholder="Business Days in MT"
        value={formData.business_days_in_mt || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="date"
        id="mt_exit_projection_date"
        name="mt_exit_projection_date"
        value={formData.mt_exit_projection_date || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      <input
        type="number"
        id="base_income_money"
        name="base_income_money"
        placeholder="Base Income Money"
        value={formData.base_income_money || ''}
        onChange={handleInputChange}
        disabled={isDisabled}
      />
      
      <div className="modal-actions">
        {!isDisabled && (
          <button type="submit" className="save-button" disabled={isDisabled}>
            Save
          </button>
        )}
        <button type="button" onClick={onClose} className="cancel-button">Close</button>
      </div>
      </form>
    </div>
  );
};
