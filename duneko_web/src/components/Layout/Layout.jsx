// Layout.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  FaHome, FaChartLine, FaComments, FaCog,
  FaUser, FaInfoCircle, FaSignOutAlt, FaBook, FaMedal,
  FaTrashAlt, FaRecycle, FaLeaf, FaMoon, FaSun
} from 'react-icons/fa';
import { FaPeopleGroup } from "react-icons/fa6";
import './Layout.css';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const navLinks = React.useMemo(() => [
    { path: '/dashboard', icon: <FaHome />, label: 'Tableau de bord' },
    { path: '/activity', icon: <FaChartLine />, label: 'Activité' },
    { path: '/collection', icon: <FaTrashAlt />, label: 'Collecte' },
    { path: '/recycling', icon: <FaRecycle />, label: 'Recyclage' },
    { path: '/settings', icon: <FaCog />, label: 'Paramètres' },
    { path: '/agents', icon: <FaPeopleGroup />, label: 'Agents' },
    { path: '/profile', icon: <FaUser />, label: 'Profil' },
    { path: '/resources', icon: <FaBook />, label: 'Ressources' },
    { path: '/achievements', icon: <FaMedal />, label: 'Récompenses' },
    { path: '/about', icon: <FaInfoCircle />, label: 'À propos' },
  ], []);

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className={`layout-container ${darkMode ? 'dark' : ''}`}>
      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        ref={sidebarRef}
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        aria-expanded={sidebarOpen}
      >
        <div className="sidebar-inner">
          <div className="sidebar-header">
            <div className="logo-container">
              <div className="logo">
                <div className="logo-icon">
                  <FaLeaf className="leaf-icon" />
                </div>
                <div className="logo-text-container">
                  <span className="logo-text">Duneko</span>
                  <span className="logo-subtitle">Gestion mondiale des déchets</span>
                </div>
              </div>
            </div>
          </div>

          <nav className="navigation" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                aria-current={location.pathname === link.path ? 'page' : undefined}
                onClick={() => {
                  setSidebarOpen(false);
                }}
              >
                <span className="nav-icon">
                  {link.icon}
                </span>
                <span className="nav-label">{link.label}</span>
                <div className="nav-highlight"></div>
              </Link>
            ))}
          </nav>

          <div className="action-buttons">
            <button
              className="dark-mode-toggle"
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              <span className="toggle-icon">
                {darkMode ? <FaMoon /> : <FaSun />}
              </span>
              <span>{darkMode ? "Mode clair" : "Mode sombre"}</span>
            </button>

            <button
              onClick={handleLogout}
              className="logout-button"
              aria-label="Se déconnecter"
            >
              <span className="logout-icon">
                <FaSignOutAlt />
              </span>
              <span className="logout-text">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <main className="content-area">
          <div className="content-animation">
            <Outlet />
          </div>
        </main>
      </div>
    </div>

  );
};

export default Layout;