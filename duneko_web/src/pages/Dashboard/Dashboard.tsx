import React, { useState, useEffect } from "react";
import './Dashboard.css';
import StatCard from "../../components/Card/StatCard";
import { FaExclamationTriangle, FaGift, FaTruck, FaUsers, FaGlobeAmericas, FaSearch, FaChevronDown } from "react-icons/fa";
import AlertCard from "../../components/Card/AlertCard";
import AgentCard from "../../components/Card/AgentCard";

const DashboardPage: React.FC = () => {
  const [currentRegionIndex, setCurrentRegionIndex] = useState(0);

  const pollutionData = [
    { region: "Afrique", percentage: 12, color: "#4CAF50" },
    { region: "Asie", percentage: 35, color: "#F44336" },
    { region: "Europe", percentage: 15, color: "#FFC107" },
    { region: "Amérique du Nord", percentage: 20, color: "#2196F3" },
    { region: "Amérique du Sud", percentage: 10, color: "#9C27B0" },
    { region: "Océanie", percentage: 8, color: "#00BCD4" },
  ];

  // Données pour les graphiques circulaires
  const wasteDistribution = [
    { type: "Plastique", percentage: 45, color: "#2196F3" },
    { type: "Verre", percentage: 20, color: "#4CAF50" },
    { type: "Métal", percentage: 15, color: "#FFC107" },
    { type: "Papier", percentage: 12, color: "#9C27B0" },
    { type: "Organique", percentage: 8, color: "#795548" },
  ];

  const alertStatus = [
    { status: "Nouveau", percentage: 30, color: "#F44336" },
    { status: "Validé", percentage: 50, color: "#2196F3" },
    { status: "Collecté", percentage: 20, color: "#4CAF50" },
  ];

  // Cycle automatique des régions toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRegionIndex(prevIndex => (prevIndex + 1) % pollutionData.length);
    }, 10000); // 10 secondes

    return () => clearInterval(interval);
  }, [pollutionData.length]);

  // Fonction pour générer les graphiques circulaires
  const renderDonutChart = (data: any[], size: number = 140) => {
    const radius = size / 2;
    const strokeWidth = 10;
    const innerRadius = radius - strokeWidth;
    const circumference = 2 * Math.PI * innerRadius;

    let total = 0;
    return (
      <div className="donut-chart" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {data.map((item, index) => {
            const start = total;
            const percentage = item.percentage;
            total += percentage;
            const strokeDasharray = `${(circumference * percentage) / 100} ${circumference}`;
            const rotation = (start / 100) * 360;

            return (
              <circle
                key={index}
                cx={radius}
                cy={radius}
                r={innerRadius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset="0"
                transform={`rotate(${-90 + rotation} ${radius} ${radius})`}
              />
            );
          })}
          <circle
            cx={radius}
            cy={radius}
            r={innerRadius - strokeWidth / 2}
            fill="white"
          />
          <text
            x={radius}
            y={radius}
            textAnchor="middle"
            dy=".3em"
            fontSize="16"
            fontWeight="bold"
          >
            {data.reduce((acc, item) => acc + item.percentage, 0)}%
          </text>
        </svg>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard de Collecte</h1>
          <p className="subtitle">Aperçu global des opérations de collecte</p>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Rechercher..." />
          </div>
          <button className="btn primary">Nouvelle Alerte</button>
          <button className="btn secondary">Exporter</button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          logo={<FaExclamationTriangle className="stat-icon" />}
          titre="Signalements"
          valeur="12"
          subText="aujourd’hui / cette semaine"
          color="#d32f2f"
          progress={undefined} />

        <StatCard
          logo={<FaTruck className="stat-icon" />}
          titre="Tournées"
          valeur="08"
          color="#0288d1"
          subText="en cours" progress={undefined} />

        <StatCard
          logo={<FaGift className="stat-icon" />}
          titre="Points collectés"
          progress={65}
          color="#7b1fa2"
          valeur="1,245"
          subText="sur 1,900 prévus" />

        <StatCard
          logo={<FaUsers className="stat-icon" />}
          titre="Agents actifs"
          valeur="15"
          subText="en service"
          color="#2e7d32"
          progress={undefined} />
      </div>

      <div className="dashboard-content">
        <div className="charts-row">
          <div className="chart-container">
            <div className="chart-header">
              <h3>Répartition des déchets</h3>
            </div>
            <div className="chart-content">
              {renderDonutChart(wasteDistribution)}
              <div className="chart-legend">
                {wasteDistribution.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="color-box" style={{ backgroundColor: item.color }}></div>
                    <span className="legend-text">{item.type}: {item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-header">
              <h3>Statut des alertes</h3>
            </div>
            <div className="chart-content">
              {renderDonutChart(alertStatus)}
              <div className="chart-legend">
                {alertStatus.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="color-box" style={{ backgroundColor: item.color }}></div>
                    <span className="legend-text">{item.status}: {item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="alerts-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="badge">3</span>
                Alertes en attentes
              </h2>
              <button className="view-all">Voir tout <FaChevronDown /></button>
            </div>
            <div className="alerts-container">
              <AlertCard
                title="Déchets sauvages"
                location="Hirrer"
                wasteType="Plastique"
                date="07/06/2025"
                status="nouveau"
              />
              <AlertCard
                title="Bac plein"
                location="Place centrale"
                wasteType="Ordures ménagères"
                date="07/06/2025"
                status="valide"
              />
              <AlertCard
                title="Déchets dangereux"
                location="Zone industrielle"
                wasteType="Produits chimiques"
                date="06/06/2025"
                status="collecté"
              />
            </div>
          </div>

          <div className="agents-section">
            <div className="section-header">
              <h2 className="section-title">
                Agents de collecte
                <span className="status-indicator active">15 actifs</span>
              </h2>
              <button className="view-all">Voir tout <FaChevronDown /></button>
            </div>
            <div className="agents-container">
              <AgentCard
                name="Sophie Martin"
                tours="18"
                zone="Zone Est"
                status="Actif"
                avatarColor="#4CAF50"
              />
              <AgentCard
                name="Pierre Dubois"
                tours="12"
                zone="Zone Ouest"
                status="Actif"
                avatarColor="#2196F3"
              />
              <AgentCard
                name="Marie Leroy"
                tours="22"
                zone="Zone Nord"
                status="Actif"
                avatarColor="#9C27B0"
              />
            </div>
          </div>
        </div>

        <div className="map-section">
          <div className="section-header">
            <h2 className="section-title">
              <FaGlobeAmericas className="title-icon" />
              Cartographie mondiale
            </h2>
            <div className="time-filter">
              <select>
                <option>Aujourd'hui</option>
                <option>Cette semaine</option>
                <option>Ce mois</option>
              </select>
            </div>
          </div>
          <div className="world-map-container">
            <div className="world-map">
              {/* Carte mondiale stylisée avec mise en avant dynamique */}
              <div className={`continent amerique ${currentRegionIndex === 3 || currentRegionIndex === 4 ? 'highlight' : ''}`}>
                <div className={`region north-america ${currentRegionIndex === 3 ? 'highlight' : ''}`}></div>
                <div className={`region south-america ${currentRegionIndex === 4 ? 'highlight' : ''}`}></div>
              </div>
              <div className={`continent europe ${currentRegionIndex === 2 ? 'highlight' : ''}`}></div>
              <div className={`continent africa ${currentRegionIndex === 0 ? 'highlight' : ''}`}></div>
              <div className={`continent asia ${currentRegionIndex === 1 ? 'highlight' : ''}`}></div>
              <div className={`continent australia ${currentRegionIndex === 5 ? 'highlight' : ''}`}></div>
            </div>

            <div className="pollution-legend">
              <div className="legend-header">
                <h3>Pollution par région</h3>
                <div className="color-scale">
                  <span>Faible</span>
                  <div className="gradient-bar"></div>
                  <span>Élevée</span>
                </div>
              </div>

              <div className="pollution-list">
                {pollutionData.map((item, index) => (
                  <div
                    key={index}
                    className={`pollution-item ${index === currentRegionIndex ? 'highlight-item' : ''}`}
                  >
                    <div className="region-info">
                      <div className="color-dot" style={{ backgroundColor: item.color }}></div>
                      <div className="region-name">{item.region}</div>
                    </div>
                    <div className="pollution-value">
                      {item.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;