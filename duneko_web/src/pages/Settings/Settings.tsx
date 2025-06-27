import React, { useState } from "react";
import './Settings.css';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  
  // États pour les différentes sections
  const [companyInfo, setCompanyInfo] = useState({
    name: "Entreprise Togolaise SARL",
    email: "contact@entreprise.tg",
    phone: "+228 90 12 34 56",
    address: "123 Boulevard du Mono, Lomé",
    website: "www.entreprise.tg"
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    sessionTimeout: 30,
    activityAlerts: true
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: false,
    newsletter: true,
    promotions: false
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    language: "fr",
    fontSize: "medium"
  });

  const [billingSettings, setBillingSettings] = useState({
    cardNumber: "**** **** **** 1234",
    expiry: "12/25",
    cvv: "",
    billingEmail: "facturation@entreprise.tg"
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    google: true,
    microsoft: true,
    slack: false,
    trello: false,
    apiKey: "********************",
    apiSecret: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    switch(activeTab) {
      case "general":
        setCompanyInfo(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        break;
      case "security":
        setSecuritySettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        break;
      case "notifications":
        setNotificationSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        break;
      case "appearance":
        setAppearanceSettings(prev => ({ ...prev, [name]: value }));
        break;
      case "billing":
        setBillingSettings(prev => ({ ...prev, [name]: value }));
        break;
      case "integrations":
        setIntegrationSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        break;
    }
  };

  const handleSave = () => {
    alert("Paramètres enregistrés avec succès!");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Paramètres de l'Entreprise</h1>
        <p>Gérez les paramètres de votre compte entreprise au Togo</p>
      </div>
      
      <div className="settings-container">
        <div className="settings-tabs">
          <h2>Catégories</h2>
          <button 
            className={`tab-button ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            Informations Générales
          </button>
          <button 
            className={`tab-button ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            Sécurité
          </button>
          <button 
            className={`tab-button ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
          <button 
            className={`tab-button ${activeTab === "appearance" ? "active" : ""}`}
            onClick={() => setActiveTab("appearance")}
          >
            Apparence
          </button>
          <button 
            className={`tab-button ${activeTab === "billing" ? "active" : ""}`}
            onClick={() => setActiveTab("billing")}
          >
            Facturation
          </button>
          <button 
            className={`tab-button ${activeTab === "integrations" ? "active" : ""}`}
            onClick={() => setActiveTab("integrations")}
          >
            Intégrations
          </button>
        </div>
        
        <div className="settings-content">
          {activeTab === "general" && (
            <>
              <h2 className="section-title">Informations de l'Entreprise</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label htmlFor="name">Nom de l'entreprise</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={companyInfo.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={companyInfo.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={companyInfo.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="website">Site web</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={companyInfo.website}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="address">Adresse</label>
                  <textarea
                    id="address"
                    name="address"
                    value={companyInfo.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </>
          )}
          
          {activeTab === "security" && (
            <>
              <h2 className="section-title">Paramètres de Sécurité</h2>
              <div className="settings-form">
                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="twoFactor"
                      name="twoFactor"
                      checked={securitySettings.twoFactor}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="twoFactor">Authentification à deux facteurs (2FA)</label>
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="activityAlerts"
                      name="activityAlerts"
                      checked={securitySettings.activityAlerts}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="activityAlerts">Alertes d'activité suspecte</label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="sessionTimeout">Délai d'expiration de session (minutes)</label>
                  <select
                    id="sessionTimeout"
                    name="sessionTimeout"
                    value={securitySettings.sessionTimeout}
                    onChange={handleInputChange}
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 heure</option>
                    <option value="120">2 heures</option>
                    <option value="0">Jamais</option>
                  </select>
                </div>
                
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <h3>Dernières activités</h3>
                  <div className="activity-log">
                    <p>• Connexion depuis Lomé, TG - Aujourd'hui, 10:23</p>
                    <p>• Mot de passe modifié - Hier, 15:47</p>
                    <p>• Connexion depuis Kara, TG - 12 juin 2025</p>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {activeTab === "notifications" && (
            <>
              <h2 className="section-title">Préférences de Notification</h2>
              <div className="settings-form">
                <div className="form-group">
                  <h3>Méthodes de réception</h3>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="email"
                      name="email"
                      checked={notificationSettings.email}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="push"
                      name="push"
                      checked={notificationSettings.push}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="push">Notifications push</label>
                  </div>
                </div>
                
                <div className="form-group">
                  <h3>Types de notifications</h3>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      checked={notificationSettings.newsletter}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="newsletter">Newsletters</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="promotions"
                      name="promotions"
                      checked={notificationSettings.promotions}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="promotions">Offres promotionnelles</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="updates"
                      name="updates"
                      checked
                      onChange={handleInputChange}
                      disabled
                    />
                    <label htmlFor="updates">Mises à jour importantes</label>
                  </div>
                </div>
                
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <h3>Fréquence des notifications</h3>
                  <p>Recevoir des résumés hebdomadaires des activités de votre compte.</p>
                  <div className="checkbox-group">
                    <input
                      type="radio"
                      id="frequency-daily"
                      name="frequency"
                      value="daily"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="frequency-daily">Quotidiennement</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="radio"
                      id="frequency-weekly"
                      name="frequency"
                      value="weekly"
                      onChange={handleInputChange}
                      checked
                    />
                    <label htmlFor="frequency-weekly">Hebdomadairement</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="radio"
                      id="frequency-monthly"
                      name="frequency"
                      value="monthly"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="frequency-monthly">Mensuellement</label>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {activeTab === "appearance" && (
            <>
              <h2 className="section-title">Apparence</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label htmlFor="theme">Thème</label>
                  <select
                    id="theme"
                    name="theme"
                    value={appearanceSettings.theme}
                    onChange={handleInputChange}
                  >
                    <option value="light">Clair</option>
                    <option value="dark">Sombre</option>
                    <option value="system">Système</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="language">Langue</label>
                  <select
                    id="language"
                    name="language"
                    value={appearanceSettings.language}
                    onChange={handleInputChange}
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="fontSize">Taille de police</label>
                  <select
                    id="fontSize"
                    name="fontSize"
                    value={appearanceSettings.fontSize}
                    onChange={handleInputChange}
                  >
                    <option value="small">Petite</option>
                    <option value="medium">Moyenne</option>
                    <option value="large">Grande</option>
                    <option value="x-large">Très grande</option>
                  </select>
                </div>
                
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <h3>Aperçu</h3>
                  <div className="theme-preview">
                    <div style={{
                      background: appearanceSettings.theme === 'dark' ? '#2c3e50' : '#fff',
                      color: appearanceSettings.theme === 'dark' ? '#fff' : '#333',
                      fontSize: 
                        appearanceSettings.fontSize === 'small' ? '14px' : 
                        appearanceSettings.fontSize === 'medium' ? '16px' : 
                        appearanceSettings.fontSize === 'large' ? '18px' : '20px'
                    }}>
                      Exemple de texte
                    </div>
                    <div style={{
                      background: appearanceSettings.theme === 'dark' ? '#34495e' : '#f8f9fa',
                      color: appearanceSettings.theme === 'dark' ? '#fff' : '#333',
                      fontSize: 
                        appearanceSettings.fontSize === 'small' ? '14px' : 
                        appearanceSettings.fontSize === 'medium' ? '16px' : 
                        appearanceSettings.fontSize === 'large' ? '18px' : '20px'
                    }}>
                      Exemple de texte
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {activeTab === "billing" && (
            <>
              <h2 className="section-title">Facturation et Abonnement</h2>
              <div className="settings-form">
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <h3>Votre plan actuel</h3>
                  <div className="plan-card">
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>Plan Entreprise</h4>
                    <p style={{ margin: '0 0 15px 0' }}>
                      <span className="togo-flag"></span>
                      <strong>25 000 FCFA/mois</strong>
                    </p>
                    <p>Prochaine facturation: 20 juillet 2025</p>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="cardNumber">Numéro de carte</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="**** **** **** 1234"
                    value={billingSettings.cardNumber}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="expiry">Date d'expiration</label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    placeholder="MM/AA"
                    value={billingSettings.expiry}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="***"
                    value={billingSettings.cvv}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="billingEmail">Email de facturation</label>
                  <input
                    type="email"
                    id="billingEmail"
                    name="billingEmail"
                    placeholder="facturation@entreprise.tg"
                    value={billingSettings.billingEmail}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </>
          )}
          
          {activeTab === "integrations" && (
            <>
              <h2 className="section-title">Intégrations</h2>
              <div className="settings-form">
                <div className="form-group">
                  <h3>Services connectés</h3>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="google"
                      name="google"
                      checked={integrationSettings.google}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="google">Google Workspace</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="microsoft"
                      name="microsoft"
                      checked={integrationSettings.microsoft}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="microsoft">Microsoft 365</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="slack"
                      name="slack"
                      checked={integrationSettings.slack}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="slack">Slack</label>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="trello"
                      name="trello"
                      checked={integrationSettings.trello}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="trello">Trello</label>
                  </div>
                </div>
                
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <h3>Configuration API</h3>
                  <div className="form-group">
                    <label htmlFor="apiKey">Clé API</label>
                    <input
                      type="text"
                      id="apiKey"
                      name="apiKey"
                      placeholder="********************"
                      value={integrationSettings.apiKey}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="apiSecret">Secret API</label>
                    <input
                      type="password"
                      id="apiSecret"
                      name="apiSecret"
                      placeholder="********************"
                      value={integrationSettings.apiSecret}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="divider"></div>
          
          <button className="save-button" onClick={handleSave}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;