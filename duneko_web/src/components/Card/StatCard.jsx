// src/components/StatCard.jsx
import React from 'react';
import './StatCard.css';

const StatCard = ({ 
  logo, 
  titre, 
  valeur, 
  subText, 
  progress,
  color = '#2e7d32'
}) => {
  return (
    <div className="stat-card" style={{ '--card-color': color }}>
      <div className="card-header">
        <div className="card-icon">{logo}</div>
        <h3 className="card-title">{titre}</h3>
      </div>

      {typeof progress === 'number' ? (
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="progress-value">{progress}%</div>
        </div>
      ) : (
        <div className="value-container">
          <div className="main-value">{valeur}</div>
          {subText && <div className="sub-text">{subText}</div>}
        </div>
      )}
    </div>
  );
};

export default StatCard;