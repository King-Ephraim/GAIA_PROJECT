import React from 'react';
import './StatCardDiagramme.css'; 

const StatCardDiagramme = ({ title, value, icon, color = '#2e7d32' }) => {
  return (
    <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
};

export default StatCardDiagramme;