import React from "react";
import { FaBook, FaVideo, FaFilePdf, FaChartBar } from "react-icons/fa";
import "./Resources.css";

const ResourcesPage: React.FC = () => {
  const resources = [
    { id: 1, icon: <FaBook className="resource-icon" />, title: "Guide de collecte", category: "Documentation", description: "Manuel complet des procédures de collecte des déchets" },
    { id: 2, icon: <FaVideo className="resource-icon" />, title: "Formation sécurité", category: "Vidéo", description: "Tutoriel sur les équipements de protection individuelle" },
    { id: 3, icon: <FaFilePdf className="resource-icon" />, title: "Rapport annuel", category: "Rapport", description: "Analyse des performances de collecte 2023" },
    { id: 4, icon: <FaChartBar className="resource-icon" />, title: "Statistiques", category: "Données", description: "Données mensuelles sur la gestion des déchets" },
  ];

  return (
    <div className="resources-container">
      <div className="resources-header">
        <h1>Centre de Ressources</h1>
        <p>Tous les documents et outils pour optimiser vos opérations</p>
      </div>

      <div className="resource-filters">
        <div className="search-section">
          <input type="text" placeholder="Rechercher une ressource..." />
          <button className="search-btn">
            <FaBook />
          </button>
        </div>
        
        <div className="category-tabs">
          <button className="tab active">Tous</button>
          <button className="tab">Documentation</button>
          <button className="tab">Vidéos</button>
          <button className="tab">Rapports</button>
        </div>
      </div>

      <div className="resources-grid">
        {resources.map(resource => (
          <div key={resource.id} className="resource-card">
            <div className="card-header">
              <div className="icon-wrapper">
                {resource.icon}
              </div>
              <span className="resource-category">{resource.category}</span>
            </div>
            <div className="card-content">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
            </div>
            <div className="card-footer">
              <button className="download-btn">Télécharger</button>
              <span className="file-size">PDF • 2.4MB</span>
            </div>
          </div>
        ))}
      </div>

      <div className="featured-section">
        <h2>Ressources en vedette</h2>
        <div className="featured-card">
          <div className="featured-content">
            <div className="featured-badge">POPULAIRE</div>
            <h3>Nouveau protocole de tri</h3>
            <p>Mise à jour des procédures de tri sélectif conforme aux nouvelles normes gouvernementales</p>
            <button className="primary-btn">Accéder à la ressource</button>
          </div>
          <div className="featured-image">
            <div className="image-placeholder"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;