import React, { useState } from "react";
import {
  FaBoxOpen,
  FaEdit,
  FaCheckCircle,
  FaTrash,
  FaExclamationTriangle,
  FaUser,
  FaTrophy
} from "react-icons/fa";
import './Activity.css';

interface ActivityItem {
  id: number;
  type: string;
  action: string;
  user: string;
  details: string;
  date: string;
  time: string;
  status: string;
}

const ActivityPage: React.FC = () => {
  const initialActivityData: ActivityItem[] = [
    { id: 1, type: "collect", action: "Nouvelle collecte", user: "Alice Dupont", details: "Plastique - 120kg - Lomé", date: "2023-10-15", time: "09:45", status: "completed" },
    { id: 2, type: "modify", action: "Modification", user: "Bob Martin", details: "Verre - 85kg → 95kg", date: "2023-10-15", time: "10:20", status: "completed" },
    { id: 3, type: "validation", action: "Validation", user: "Charles Dubois", details: "Métal - 45kg - Kara", date: "2023-10-14", time: "14:15", status: "completed" },
    { id: 4, type: "delete", action: "Suppression", user: "Sophie Lambert", details: "Papier - 210kg - Sokodé", date: "2023-10-14", time: "16:30", status: "completed" },
    { id: 5, type: "collect", action: "Nouvelle collecte", user: "Thomas Leroy", details: "Organique - 150kg - Kpalimé", date: "2023-10-13", time: "08:10", status: "pending" },
    { id: 6, type: "alert", action: "Alerte", user: "Système", details: "Quantité anormale détectée", date: "2023-10-13", time: "11:55", status: "warning" },
    { id: 7, type: "validation", action: "Validation", user: "Émilie Petit", details: "Électronique - 75kg - Dapaong", date: "2023-10-12", time: "15:40", status: "completed" },
    { id: 8, type: "collect", action: "Nouvelle collecte", user: "David Moreau", details: "Textile - 95kg - Lomé", date: "2023-10-12", time: "17:20", status: "completed" },
  ];

  const [activities] = useState<ActivityItem[]>(initialActivityData);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === "all" || activity.type === filter;
    const matchesSearch = activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "collect": return <FaBoxOpen className="icon-collect" />;
      case "modify": return <FaEdit className="icon-modify" />;
      case "validation": return <FaCheckCircle className="icon-validation" />;
      case "delete": return <FaTrash className="icon-delete" />;
      case "alert": return <FaExclamationTriangle className="icon-alert" />;
      default: return <FaUser className="icon-default" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed": return "completed";
      case "pending": return "pending";
      case "warning": return "warning";
      default: return "";
    }
  };

  return (
    <div className="activity-container">
      <div className="activity-header">
        <div className="header-text">
          <h1>Activités Récentes</h1>
          <p>Suivi des opérations de collecte et gestion des déchets</p>
        </div>
        <div className="stats-summary">
          <div className="stat-item">
            <div className="stat-value">{activities.length}</div>
            <div className="stat-label">Actions</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">87%</div>
            <div className="stat-label">Terminées</div>
          </div>
        </div>
      </div>

      <div className="activity-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher par utilisateur ou détails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-container">
          <div className="filter-buttons">
            <button
              className={`filter-button ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Toutes
            </button>
            <button
              className={`filter-button ${filter === "collect" ? "active" : ""}`}
              onClick={() => setFilter("collect")}
            >
              Collectes
            </button>
            <button
              className={`filter-button ${filter === "validation" ? "active" : ""}`}
              onClick={() => setFilter("validation")}
            >
              Validations
            </button>
            <button
              className={`filter-button ${filter === "modify" ? "active" : ""}`}
              onClick={() => setFilter("modify")}
            >
              Modifications
            </button>
          </div>
        </div>
      </div>

      <div className="activity-timeline">
        {filteredActivities.length > 0 ? (
          filteredActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className={`activity-icon ${activity.type}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="activity-content">
                <div className="activity-header-inner">
                  <h3>{activity.action}</h3>
                  <div className={`activity-status ${getStatusClass(activity.status)}`}>
                    {activity.status === "completed" ? "Terminé" :
                      activity.status === "pending" ? "En attente" : "Alerte"}
                  </div>
                </div>
                <div className="activity-details">
                  <p>{activity.details}</p>
                </div>
                <div className="activity-meta">
                  <div className="user-info">
                    <div className="user-avatar">
                      {activity.user.charAt(0)}
                    </div>
                    <span>{activity.user}</span>
                  </div>
                  <div className="activity-date">
                    {activity.date} à {activity.time}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            Aucune activité trouvée pour votre recherche
          </div>
        )}
      </div>

      <div className="activity-summary">
        <h2>Statistiques des Activités</h2>
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon">
              <FaBoxOpen className="icon-collect" />
            </div>
            <div className="summary-text">
              <div className="summary-value">12</div>
              <div className="summary-label">Collectes ce mois</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">
              <FaCheckCircle className="icon-validation" />
            </div>
            <div className="summary-text">
              <div className="summary-value">87%</div>
              <div className="summary-label">Taux de validation</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">
              <FaUser className="icon-user" />
            </div>
            <div className="summary-text">
              <div className="summary-value">8</div>
              <div className="summary-label">Utilisateurs actifs</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon">
              <FaTrophy className="icon-trophy" />
            </div>
            <div className="summary-text">
              <div className="summary-value">Alice Dupont</div>
              <div className="summary-label">Meilleur collecteur</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;