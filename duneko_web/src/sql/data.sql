CREATE DATABASE duneko_database

-- Création de la table entreprises
CREATE TABLE entreprises (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    domaine VARCHAR(255) UNIQUE NOT NULL,
    logo_url TEXT,
    email_admin VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table users avec référence à entreprises
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nom_utilisateur VARCHAR(255) NOT NULL UNIQUE,
    courriel VARCHAR(255) NOT NULL UNIQUE,
    hachage_mot_de_passe VARCHAR(255) NOT NULL,
    prenom VARCHAR(100),
    nom VARCHAR(100),
    role VARCHAR(20) CHECK (role IN ('utilisateur', 'agent', 'administrateur')) NOT NULL DEFAULT 'utilisateur',
    entreprise_id INTEGER REFERENCES entreprises(id) ON DELETE SET NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_mise_a_jour TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tables dépendantes de users
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    jeton VARCHAR(255) NOT NULL,
    date_expiration TIMESTAMP NOT NULL
);

CREATE TABLE zones (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    points_geojson JSON NOT NULL,
    distance_km FLOAT,
    duree_estimee FLOAT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tables dépendantes de users et zones
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    zone_id INTEGER REFERENCES zones(id) ON DELETE SET NULL,
    type_signalement VARCHAR(50) CHECK (type_signalement IN ('dechet', 'incident')) NOT NULL,
    description TEXT,
    url_photo VARCHAR(255),
    statut VARCHAR(20) CHECK (statut IN ('nouveau', 'en_cours', 'resolu')) DEFAULT 'nouveau',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_mise_a_jour TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    agent_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    zone_id INTEGER REFERENCES zones(id) ON DELETE SET NULL,
    report_id INTEGER REFERENCES reports(id) ON DELETE SET NULL,
    poids_collecte_kg FLOAT,
    date_collecte TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Autres tables
CREATE TABLE daily_stats (
    id SERIAL PRIMARY KEY,
    date_stat DATE NOT NULL UNIQUE,
    total_signalements INTEGER DEFAULT 0,
    total_collectes INTEGER DEFAULT 0,
    utilisateurs_actifs INTEGER DEFAULT 0,
    taux_resolution DECIMAL(5,2) DEFAULT 0
);

CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type_recompense VARCHAR(100),
    description TEXT,
    date_obtention TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(255),
    metadonnees JSON,
    horodatage TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE agents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    telephone VARCHAR(20),
    statut_agent VARCHAR(20) CHECK (statut_agent IN ('disponible', 'en_mission', 'hors_ligne')) DEFAULT 'disponible',
    zone_assignee_id INTEGER REFERENCES zones(id) ON DELETE SET NULL
);

CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    sujet VARCHAR(255),
    cree_par INTEGER REFERENCES users(id) ON DELETE SET NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    expediteur_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    contenu TEXT,
    date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255),
    url VARCHAR(255),
    type_ressource VARCHAR(20) CHECK (type_ressource IN ('guide', 'tutoriel', 'PDF', 'lien_externe')),
    description TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    cle VARCHAR(100),
    valeur TEXT,
    date_mise_a_jour TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

	-- Ajouter entreprise_id à toutes les tables
ALTER TABLE reports ADD COLUMN entreprise_id INTEGER REFERENCES entreprises(id);
ALTER TABLE collections ADD COLUMN entreprise_id INTEGER REFERENCES entreprises(id);
ALTER TABLE zones ADD COLUMN entreprise_id INTEGER REFERENCES entreprises(id);
ALTER TABLE conversations ADD COLUMN entreprise_id INTEGER REFERENCES entreprises(id);
ALTER TABLE messages ADD COLUMN entreprise_id INTEGER REFERENCES entreprises(id);
ALTER TABLE resources ADD COLUMN entreprise_id INTEGER REFERENCES entreprises(id);
ALTER TABLE agents ADD COLUMN entreprise_id INTEGER REFERENCES entreprises(id);

-- Ajouter type_dechet aux signalements
ALTER TABLE reports ADD COLUMN type_dechet VARCHAR(50);

-- Créer la colonne statut dans agents
ALTER TABLE agents ADD COLUMN statut_agent VARCHAR(20) 
    CHECK (statut_agent IN ('disponible', 'en_mission', 'hors_ligne')) 
    DEFAULT 'disponible';