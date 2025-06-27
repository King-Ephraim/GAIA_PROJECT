import React, { useState } from 'react';
import {
    User,
    PlusCircle,
    FileText,
    Edit3,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Circle,
    Frown,
    X
} from 'lucide-react';
import './Agents.css';
import { FaFilePdf, FaFileExcel } from "react-icons/fa6";

const Agents = () => {
    const [agents, setAgents] = useState([
        { id: 1, name: 'Sophie Martin', role: 'Collecteur', status: 'Actif', lastLogin: '2025-10-01' },
        { id: 2, name: 'Thomas Dubois', role: 'Superviseur', status: 'Inactif', lastLogin: '2025-09-15' },
        { id: 3, name: 'Camille Lambert', role: 'Administrateur', status: 'Actif', lastLogin: '2025-10-05' },
        { id: 4, name: 'Julien Moreau', role: 'Collecteur', status: 'Actif', lastLogin: '2025-10-02' },
        { id: 5, name: 'Émilie Girard', role: 'Superviseur', status: 'Inactif', lastLogin: '2025-09-20' },
        { id: 6, name: 'Nicolas Roy', role: 'Administrateur', status: 'Actif', lastLogin: '2025-10-03' },
        { id: 7, name: 'Léa Petit', role: 'Collecteur', status: 'Actif', lastLogin: '2025-10-04' },
        { id: 8, name: 'Antoine Richard', role: 'Superviseur', status: 'Inactif', lastLogin: '2025-09-25' },
        { id: 9, name: 'Marie Lefebvre', role: 'Administrateur', status: 'Actif', lastLogin: '2025-10-06' },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('Tous');
    const [currentPage, setCurrentPage] = useState(1);
    const agentsPerPage = 5;

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet agent ?')) {
            setAgents(agents.filter(agent => agent.id !== id));
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const filteredAgents = agents.filter(agent => {
        const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'Tous' || agent.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const indexOfLastAgent = currentPage * agentsPerPage;
    const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
    const currentAgents = filteredAgents.slice(indexOfFirstAgent, indexOfLastAgent);
    const totalPages = Math.ceil(filteredAgents.length / agentsPerPage);

    return (
        <div className="agents-page">
            <div className='agents-header'>
                <div className="header-left">
                    <h1><User className="icon-agents" size={24} /> Agents de collecte</h1>
                    <p>Gérez tous vos agents de collecte en un seul endroit</p>
                </div>
                <div className='agents-header-gestion'>
                    <button className='btn btn-primary' onClick={toggleForm}>
                        <PlusCircle className="btn-icon" size={18} /> Ajouter un agent
                    </button>
                    <div className="export-buttons">
                        <button className='btn btn-export'>
                            <FileText className="btn-icon" size={16} /> DOCX
                        </button>
                        <button className='btn btn-export'>
                            <FaFileExcel className="btn-icon" size={16} /> Excel
                        </button>
                        <button className='btn btn-export'>
                            <FaFilePdf className="btn-icon" size={16} /> PDF
                        </button>
                    </div>
                </div>
            </div>

            <div className="controls-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Rechercher un agent..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filters-container">
                    <div className="filter-group">
                        <label>Filtrer par statut :</label>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="Tous">Tous</option>
                            <option value="Actif">Actif</option>
                            <option value="Inactif">Inactif</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className='agents-table'>
                    <thead>
                        <tr>
                            <th className="col-id">ID</th>
                            <th className="col-name">Agent</th>
                            <th className="col-role">Rôle</th>
                            <th className="col-status">Status</th>
                            <th className="col-login">Dernière connexion</th>
                            <th className="col-actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAgents.length > 0 ? (
                            currentAgents.map(agent => (
                                <tr key={agent.id}>
                                    <td className="col-id"><span className="agent-id">{agent.id}</span></td>
                                    <td className="col-name">
                                        <div className="agent-info">
                                            <div className="avatar">
                                                {agent.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="agent-name">{agent.name}</div>
                                                <div className="agent-email">agent{agent.id}@collecte.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="col-role">
                                        <span className={`role-badge ${agent.role.toLowerCase()}`}>
                                            {agent.role}
                                        </span>
                                    </td>
                                    <td className="col-status">
                                        <span className={`status-badge ${agent.status.toLowerCase()}`}>
                                            <Circle className="status-indicator" size={10} />
                                            {agent.status}
                                        </span>
                                    </td>
                                    <td className="col-login">{agent.lastLogin}</td>
                                    <td className="col-actions">
                                        <div className="actions">
                                            <button
                                                className='btn-action btn-edit'
                                                onClick={() => console.log(`Modifier agent ${agent.id}`)}
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                className='btn-action btn-delete'
                                                onClick={() => handleDelete(agent.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="no-results">
                                    <div className="no-results-content">
                                        <Frown className="no-results-icon" size={40} />
                                        <h3>Aucun agent trouvé</h3>
                                        <p>Essayez de modifier vos filtres de recherche</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination-container">
                <div className="pagination-info">
                    {filteredAgents.length} agents sur {agents.length}
                </div>

                <div className="pagination-controls">
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        <ChevronLeft size={16} /> Précédent
                    </button>

                    <div className="page-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                className={`page-number ${currentPage === page ? 'active' : ''}`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        className="pagination-btn"
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Suivant <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="form-overlay">
                    <div className="form-container">
                        <div className="form-header">
                            <h3>Ajouter un nouvel agent</h3>
                            <button className="close-btn" onClick={toggleForm}>
                                <X size={20} />
                            </button>
                        </div>
                        <form>
                            <div className="form-group">
                                <label>Nom complet</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Rôle</label>
                                <select className="form-control">
                                    <option>Collecteur</option>
                                    <option>Superviseur</option>
                                    <option>Administrateur</option>
                                </select>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={toggleForm}>
                                    Annuler
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Enregistrer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Agents;