import React, { useState, useEffect } from 'react';
import  './ZoneCard.css'; 

const ZoneCard = () => {
  const zones = [
    { 
      name: "Afrique", 
      description: "Zones les plus polluées", 
      stats: "12 alertes actives" 
    },
    { 
      name: "Europe", 
      description: "Zones en cours de nettoyage", 
      stats: "8 tournées en cours" 
    },
    { 
      name: "Asie", 
      description: "Nouvelles zones critiques", 
      stats: "24 points à traiter" 
    },
    { 
      name: "Amérique", 
      description: "Collecte programmée", 
      stats: "15 agents mobilisés" 
    }
  ];

  const [currentZone, setCurrentZone] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentZone((prev) => (prev + 1) % zones.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [zones.length]);

  return (
    <div className="zone-card">
      <div className="zone-map">
        {/* Icône représentative - À remplacer par une vraie carte */}
        <div className="map-placeholder">
          <span>Carte {zones[currentZone].name}</span>
        </div>
      </div>
      <div className="zone-info">
        <h3 className="zone-name">{zones[currentZone].name}</h3>
        <p className="zone-description">{zones[currentZone].description}</p>
        <p className="zone-stats">{zones[currentZone].stats}</p>
      </div>
      <div className="zone-indicators">
        {zones.map((_, index) => (
          <div 
            key={index} 
            className={`indicator ${index === currentZone ? 'active' : ''}`}
            onClick={() => setCurrentZone(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ZoneCard;