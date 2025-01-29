import React, { useState, useEffect } from "react";
import '../styles/App.css';


export const UserForm = ({ user, onSubmit, onClose, isOpen, isDisabled }) => {

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
    <div className="modal-overlay">
    <div className="modal-content">
    <form onSubmit={handleSubmit}>
    <div>
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
      name="full_name"
      placeholder="Full Name"
      value={formData.full_name || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      required
      type="text"
      name="role"
      placeholder="Role"
      value={formData.role || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="text"
      name="level"
      placeholder="Level"
      value={formData.level || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="text"
      name="department"
      placeholder="Department"
      value={formData.department || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="text"
      name="location"
      placeholder="Location"
      value={formData.location || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="text"
      name="assigned_account_or_clients"
      placeholder="Assigned Account or Clients"
      value={formData.assigned_account_or_clients || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="text"
      name="english_level"
      placeholder="English Level"
      value={formData.english_level || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="text"
      name="cv_link"
      placeholder="CV Link"
      value={formData.cv_link || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="text"
      name="tech_profile_1"
      placeholder="Tech Profile 1"
      value={formData.tech_profile_1 || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="text"
      name="entry_type"
      placeholder="Entry Type"
      value={formData.entry_type || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="date"
      name="mt_entry_date"
      value={formData.mt_entry_date || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="text"
      name="office_location"
      placeholder="Office Location"
      value={formData.office_location || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="text"
      name="city_of_residence"
      placeholder="City of Residence"
      value={formData.city_of_residence || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="text"
      name="time_zone"
      placeholder="Time Zone"
      value={formData.time_zone || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="number"
      name="business_days_in_mt"
      placeholder="Business Days in MT"
      value={formData.business_days_in_mt || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="date"
      name="mt_exit_projection_date"
      value={formData.mt_exit_projection_date || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    <input
      type="number"
      name="base_income_money"
      placeholder="Base Income Money"
      value={formData.base_income_money || ''}
      onChange={handleInputChange}
      disabled={isDisabled}
    />
    
    <div className="form-actions">
            {!isDisabled && (
              <button type="submit" disabled={isDisabled}>
                Save
              </button>
            )}
          </div>
    </form>
    <button onClick={onClose}>Close</button>
    </div>
    </div>
  );
};
