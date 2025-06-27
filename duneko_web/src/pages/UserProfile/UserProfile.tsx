import React, { useState } from "react";
import './UserProfile.css'; 

const UserProfilePage: React.FC = () => {
  // État initial des données de l'entreprise
  const [companyProfile, setCompanyProfile] = useState({
    name: "Tech Solutions SARL",
    address: "123 Avenue des Champs-Élysées, Paris",
    phone: "01 23 45 67 89",
    email: "contact@techsolutions.fr",
    website: "www.techsolutions.fr",
    description: "Spécialiste en développement web et solutions cloud pour entreprises. Nous transformons vos idées en réalité numérique.",
    founded: "2015",
    employees: "50",
    sector: "Technologie",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanyProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profil mis à jour avec succès!");
  };

  return (
    <div className="profile-container">
 

      <div className="header">
        <h1>Profil de l'Entreprise</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="edit-button"
          >
            Éditer le profil
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Nom de l'entreprise</label>
              <input
                type="text"
                name="name"
                value={companyProfile.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Secteur d'activité</label>
              <input
                type="text"
                name="sector"
                value={companyProfile.sector}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Année de création</label>
              <input
                type="text"
                name="founded"
                value={companyProfile.founded}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Nombre d'employés</label>
              <input
                type="text"
                name="employees"
                value={companyProfile.employees}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={companyProfile.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="text"
                name="phone"
                value={companyProfile.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Site web</label>
              <input
                type="url"
                name="website"
                value={companyProfile.website}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group full-width">
              <label>Adresse</label>
              <input
                type="text"
                name="address"
                value={companyProfile.address}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={companyProfile.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="cancel-button"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="save-button"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-card">
          <div className="company-header">
            <div className="company-logo">Logo</div>
            <div className="company-info">
              <h2>{companyProfile.name}</h2>
              <p>{companyProfile.sector}</p>
            </div>
          </div>
          
          <div className="section">
            <h3 className="section-title">Description</h3>
            <p className="info-value">{companyProfile.description}</p>
          </div>
          
          <div className="section">
            <h3 className="section-title">Détails de l'entreprise</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Année de création</span>
                <span className="info-value">{companyProfile.founded}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Nombre d'employés</span>
                <span className="info-value">{companyProfile.employees}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Secteur d'activité</span>
                <span className="info-value">{companyProfile.sector}</span>
              </div>
            </div>
          </div>
          
          <div className="section">
            <h3 className="section-title">Coordonnées</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Adresse</span>
                <span className="info-value">{companyProfile.address}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Téléphone</span>
                <span className="info-value">{companyProfile.phone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{companyProfile.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Site web</span>
                <span className="info-value">{companyProfile.website}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;