import React, { useState } from "react";
import {
  GiMetalBar,
  GiWineGlass,
  GiLeak,
  GiCircuitry,
} from "react-icons/gi";
import { AiOutlineFileText } from "react-icons/ai";
import "./Recycling.css";
import { FaRecycle } from 'react-icons/fa';

interface Company {
  id: number;
  name: string;
  location: string;
  recyclingRate: number; // en %
  ratesHistory: number[];
  collected: number;
}

const wasteCategories = [
  { id: "plastique", name: "Plastique", icon: <FaRecycle />, color: "#27ae60" },
  { id: "metal", name: "Métal", icon: <GiMetalBar />, color: "#95a5a6" },
  { id: "papier", name: "Papier/Carton", icon: <AiOutlineFileText />, color: "#f39c12" },
  { id: "organique", name: "Organique", icon: <GiLeak />, color: "#8e44ad" },
  { id: "electronique", name: "Électronique", icon: <GiCircuitry />, color: "#3498db" },
  { id: "verre", name: "Verre", icon: <GiWineGlass />, color: "#1abc9c" },
];

const recyclingCompanies: Company[] = [
  {
    id: 1,
    name: "Eco Togo Recyclage",
    location: "Lomé",
    recyclingRate: 85,
    ratesHistory: [70, 75, 78, 80, 82, 85],
    collected: 1250,
  },
  {
    id: 2,
    name: "SITA Togo",
    location: "Kara",
    recyclingRate: 72,
    ratesHistory: [65, 67, 69, 70, 71, 72],
    collected: 980,
  },
  {
    id: 3,
    name: "Green Tech Africa",
    location: "Sokodé",
    recyclingRate: 90,
    ratesHistory: [82, 84, 86, 88, 89, 90],
    collected: 2100,
  },
  {
    id: 4,
    name: "Clean City Togo",
    location: "Kpalimé",
    recyclingRate: 68,
    ratesHistory: [60, 62, 64, 66, 67, 68],
    collected: 750,
  },
  {
    id: 5,
    name: "Eco Plast Togo",
    location: "Dapaong",
    recyclingRate: 78,
    ratesHistory: [70, 72, 73, 75, 76, 78],
    collected: 1420,
  },
  {
    id: 6,
    name: "Bio Recycle Togo",
    location: "Atakpamé",
    recyclingRate: 88,
    ratesHistory: [80, 82, 84, 85, 87, 88],
    collected: 1630,
  },
];

const ITEMS_PER_PAGE = 4;

const RecyclingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(wasteCategories[0].id);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(recyclingCompanies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCompanies = recyclingCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const topCompanies = [...recyclingCompanies]
    .sort((a, b) => b.recyclingRate - a.recyclingRate)
    .slice(0, 3);

  return (
    <div className="recycling-container">
      {/* En-tête */}
      <header className="page-header">
        <div className="header-content">
          <h1>Gestion des Déchets - Togo</h1>
          <p>Plateforme de collecte et recyclage des déchets</p>
        </div>
        <div className="header-graphic">
          <div className="graphic-circle"></div>
          <div className="graphic-leaf"></div>
        </div>
      </header>

      {/* Catégories de déchets */}
      <section className="waste-categories">
        <div className="section-title">
          <h2>Catégories de Déchets</h2>
          <div className="title-decoration"></div>
        </div>
        <div className="categories-grid">
          {wasteCategories.map((cat) => (
            <button
              key={cat.id}
              className={`category-card ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
              style={{ '--category-color': cat.color } as React.CSSProperties}
            >
              <div className="category-icon">{cat.icon}</div>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Top entreprises */}
      <section className="company-stats">
        <div className="section-title">
          <h2>Entreprises les Plus Actives</h2>
          <div className="title-decoration"></div>
        </div>
        <div className="top-companies">
          {topCompanies.map((comp, idx) => (
            <div key={comp.id} className="top-company-card">
              <span className="rank-badge">#{idx + 1}</span>
              <div className="company-info">
                <h3>{comp.name}</h3>
                <p className="location">📍 {comp.location}</p>
              </div>
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${comp.recyclingRate}%` }}
                  ></div>
                </div>
                <div className="progress-value">{comp.recyclingRate}%</div>
              </div>
              <div className="collected-stats">
                <span className="collected-label">Collecté:</span>
                <span className="collected-value">{comp.collected} kg</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Liste des entreprises */}
      <section className="recycling-companies">
        <div className="section-header">
          <div className="section-title">
            <h2>Entreprises de Recyclage</h2>
            <div className="title-decoration"></div>
          </div>
          <div className="pagination-controls">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              &lt; Précédent
            </button>
            <span>
              Page {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Suivant &gt;
            </button>
          </div>
        </div>

        <div className="companies-grid">
          {currentCompanies.map((comp) => (
            <div key={comp.id} className="company-card">
              <div className="company-header">
                <div>
                  <h3>{comp.name}</h3>
                  <p className="company-location">📍 {comp.location}</p>
                </div>
                <div className="recycling-rate">{comp.recyclingRate}%</div>
              </div>

              <div className="company-stats-container">
                <div className="collected-stat">
                  <span className="stat-label">Collectés:</span>
                  <span className="stat-value">{comp.collected} kg</span>
                </div>
              </div>

              <div className="chart-container">
                <h4>Évolution du taux</h4>
                <div className="line-chart">
                  {comp.ratesHistory.map((rate, i) => (
                    <div key={i} className="chart-point">
                      <div className="data-point-container">
                        <div
                          className="data-point"
                          style={{ bottom: `${rate}%` }}
                        ></div>
                        <div className="point-value">{rate}%</div>
                      </div>
                      <div className="month-label">
                        {["J", "F", "M", "A", "M", "J"][i]}
                      </div>
                    </div>
                  ))}
                  <div className="chart-line"></div>
                </div>
              </div>

              <div className="company-actions">
                <button className="btn-primary">Demander collecte</button>
                <button className="btn-secondary">Voir détails</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecyclingPage;