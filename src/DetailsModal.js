import React from "react";
import "./Modal.css";

const DetailsModal = ({ data, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Details</h2>
        <div className="details-container">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="details-field">
              <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}
            </div>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DetailsModal;
