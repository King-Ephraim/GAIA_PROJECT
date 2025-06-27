import React from 'react';
import './AlertCard.css'; 

const AlertCard = ({ title, location, wasteType, date, status }) => {
  const statusColors = {
    nouveau: 'bg-orange-100 text-orange-800',
    valide: 'bg-blue-100 text-blue-800',
    collecté: 'bg-green-100 text-green-800'
  };

  return (
    <div className="alert-card">
      <div className="alert-header">
        <h3 className="alert-title">{title}</h3>
        <span className={`status-badge ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      
      <div className="alert-details">
        <div className="detail-item">
          <span>Localisation:</span>
          <strong>{location}</strong>
        </div>
        <div className="detail-item">
          <span>Type de déchets:</span>
          <strong>{wasteType}</strong>
        </div>
        <div className="detail-item">
          <span>Date:</span>
          <strong>{date}</strong>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;