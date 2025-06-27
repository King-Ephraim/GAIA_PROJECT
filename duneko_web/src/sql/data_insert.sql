
-- Insertion des données de démonstration

-- Entreprises
INSERT INTO entreprises (nom, domaine, logo_url, email_admin, mot_de_passe)
VALUES
('EcoClean', 'ecoclean.fr', 'https://ecoclean.fr/logo.png', 'admin@ecoclean.fr', 'hash1'),
('GreenWorld', 'greenworld.com', 'https://greenworld.com/logo.png', 'contact@greenworld.com', 'hash2');

-- Utilisateurs
INSERT INTO users (nom_utilisateur, courriel, hachage_mot_de_passe, prenom, nom, role, entreprise_id)
VALUES
('user1', 'user1@ecoclean.fr', 'hash1', 'Jean', 'Dupont', 'utilisateur', 1),
('agent1', 'agent1@ecoclean.fr', 'hash2', 'Marie', 'Curie', 'agent', 1),
('admin1', 'admin1@ecoclean.fr', 'hash3', 'Paul', 'Martin', 'administrateur', 1),
('user2', 'user2@greenworld.com', 'hash4', 'Lucie', 'Bernard', 'utilisateur', 2),
('agent2', 'agent2@greenworld.com', 'hash5', 'Sophie', 'Durand', 'agent', 2);

-- Sessions
INSERT INTO sessions (user_id, jeton, date_expiration)
VALUES
(1, 'token1', DATEADD(day, 1, GETDATE())),
(2, 'token2', DATEADD(day, 1, GETDATE())),
(3, 'token3', DATEADD(day, 1, GETDATE())),
(4, 'token4', DATEADD(day, 1, GETDATE())),
(5, 'token5', DATEADD(day, 1, GETDATE()));

-- Zones
INSERT INTO zones (description, points_geojson, distance_km, duree_estimee)
VALUES
('Zone Paris Centre', '{"type": "Point", "coordinates": [2.3522, 48.8566]}', 5.0, 10.0),
('Zone Lyon Part-Dieu', '{"type": "Point", "coordinates": [4.8357, 45.7640]}', 10.0, 20.0),
('Zone Marseille Vieux-Port', '{"type": "Point", "coordinates": [5.3698, 43.2965]}', 15.0, 30.0),
('Zone Bordeaux Quais', '{"type": "Point", "coordinates": [-0.5792, 44.8378]}', 20.0, 40.0),
('Zone Lille Centre', '{"type": "Point", "coordinates": [3.0573, 50.6292]}', 25.0, 50.0);

-- Signalements
INSERT INTO reports (user_id, zone_id, type_signalement, description, url_photo, statut)
VALUES
(1, 1, 'dechet', 'Déchets plastiques près de la Seine', 'http://exemple.com/photo1.jpg', 'nouveau'),
(2, 2, 'incident', 'Conteneur à verre cassé', 'http://exemple.com/photo2.jpg', 'en_cours'),
(4, 3, 'dechet', 'Dépôt sauvage sur la plage', NULL, 'resolu'),
(5, 4, 'incident', 'Poubelle publique endommagée', NULL, 'nouveau'),
(1, 5, 'dechet', 'Déchets électroniques abandonnés', 'http://exemple.com/photo5.jpg', 'en_cours');

-- Collectes
INSERT INTO collections (agent_id, zone_id, report_id, poids_collecte_kg)
VALUES
(2, 1, 1, 50.5),
(5, 2, 2, 30.0),
(2, 3, 3, 20.0),
(5, 4, 4, 40.0),
(2, 5, 5, 10.0);

-- Statistiques quotidiennes
INSERT INTO daily_stats (date_stat, total_signalements, total_collectes, utilisateurs_actifs, taux_resolution)
VALUES
('2025-06-20', 5, 3, 4, 60.00),
('2025-06-21', 7, 4, 5, 57.14),
('2025-06-22', 3, 2, 2, 66.67),
('2025-06-23', 6, 5, 3, 83.33),
('2025-06-24', 4, 3, 4, 75.00);

-- Récompenses
INSERT INTO achievements (user_id, type_recompense, description)
VALUES
(1, 'Badge Or', 'Participation active'),
(2, 'Badge Argent', 'Bonne performance'),
(3, 'Badge Bronze', 'Nouveau membre'),
(4, 'Badge Or', 'Excellente implication'),
(5, 'Badge Argent', 'Agent exemplaire');

-- Activités
INSERT INTO activities (user_id, action, metadonnees)
VALUES
(1, 'Connexion', '{"ip":"192.168.1.1"}'),
(2, 'Signalement créé', '{"reportId":1}'),
(3, 'Collecte terminée', '{"collectionId":1}'),
(4, 'Mise à jour profil', '{}'),
(5, 'Déconnexion', '{}');

-- Agents
INSERT INTO agents (user_id, telephone, statut_agent, zone_assignee_id)
VALUES
(2, '0600000001', 'disponible', 1),
(5, '0600000002', 'en_mission', 2),
(4, '0600000003', 'hors_ligne', 3),
(2, '0600000004', 'disponible', 4),
(5, '0600000005', 'en_mission', 5);

-- Conversations
INSERT INTO conversations (sujet, cree_par)
VALUES
('Problème collecte', 1),
('Demande assistance', 2),
('Signalement zone 3', 3),
('Suivi dossier', 4),
('Autre sujet', 5);

-- Messages
INSERT INTO messages (conversation_id, expediteur_id, contenu)
VALUES
(1, 1, 'Bonjour, j’ai un problème avec la collecte.'),
(1, 2, 'Je prends en charge, merci.'),
(2, 3, 'Besoin d’aide pour signalement.'),
(3, 4, 'Signalement traité.'),
(4, 5, 'Merci pour la mise à jour.');

-- Ressources
INSERT INTO resources (titre, url, type_ressource, description)
VALUES
('Guide utilisateur', 'http://exemple.com/guide.pdf', 'PDF', 'Guide complet'),
('Tutoriel nettoyage', 'http://exemple.com/tutoriel', 'tutoriel', 'Tutoriel vidéo'),
('Document réglementaire', 'http://exemple.com/doc.pdf', 'PDF', 'Document officiel'),
('Lien externe utile', 'http://exemple.com', 'lien_externe', 'Site partenaire'),
('FAQ', 'http://exemple.com/faq', 'guide', 'Questions fréquentes');

-- Paramètres
INSERT INTO settings (user_id, cle, valeur)
VALUES
(1, 'theme', 'clair'),
(2, 'notifications', 'activées'),
(3, 'langue', 'français'),
(4, 'theme', 'sombre'),
(5, 'notifications', 'désactivées');