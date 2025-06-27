import React from 'react';
import './AgentCard.css'; 

const AgentCard = ({
  name,
  tours,
  zone,
  status,
  avatarColor = '#4caf50'   // couleur par défaut si non fournie
}) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <div className="agent-card">
      <div className="agent-header">
        <div
          className="agent-avatar"
          style={{ backgroundColor: avatarColor }}
        >
          {initials}
        </div>
        <div className="agent-header-info">
          <h3 className="agent-name">{name}</h3>
          <p className="agent-tours">{tours} tournées</p>
        </div>
      </div>
      
      <div className="agent-footer">
        <button className="view-profile">Voir fiche</button>
        <div className="agent-info">
          <span className="agent-zone">{zone}</span>
          <span className={`agent-status ${status === 'Actif' ? 'active' : 'inactive'}`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
