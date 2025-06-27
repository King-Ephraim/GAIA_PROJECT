/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import multer from 'multer';
import bcrypt from 'bcrypt';
import path from 'path';
import jwt from 'jsonwebtoken';
const saltRounds = 10;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

// Routes publiques
app.get('/', (req, res) => {
  res.send('API DUNEKO');
});

app.post('/logup', upload.single('logo'), async (req, res) => {
  try {
    const { nom, domaine, email, password } = req.body;
    const logoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!nom || !domaine || !email || !password) {
      return res.status(400).json({
        error: 'Tous les champs obligatoires doivent être remplis'
      });
    }

    const existingDomaine = await pool.query(
      'SELECT * FROM entreprises WHERE domaine = $1',
      [domaine]
    );

    if (existingDomaine.rows.length > 0) {
      return res.status(400).json({
        error: 'Ce domaine est déjà utilisé par une autre entreprise'
      });
    }

    const existingEmail = await pool.query(
      'SELECT * FROM entreprises WHERE email_admin = $1',
      [email]
    );

    if (existingEmail.rows.length > 0) {
      return res.status(400).json({
        error: 'Cet email est déjà utilisé par une autre entreprise'
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newEntreprise = await pool.query(
      `INSERT INTO entreprises 
       (nom, domaine, logo_url, email_admin, mot_de_passe) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [nom, domaine, logoUrl, email, hashedPassword]
    );

    const entrepriseId = newEntreprise.rows[0].id;

    const adminUsername = email.split('@')[0];
    const adminPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = await pool.query(
      `INSERT INTO users 
       (nom_utilisateur, courriel, hachage_mot_de_passe, prenom, nom, role, entreprise_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [
        adminUsername,
        email,
        adminPassword,
        nom.split(' ')[0] || 'Admin',
        nom.split(' ').slice(1).join(' ') || '',
        'administrateur',
        entrepriseId
      ]
    );

    const token = jwt.sign(
      {
        entrepriseId: entrepriseId,
        email: email,
        role: 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Entreprise et administrateur créés avec succès',
      token,
      entreprise: newEntreprise.rows[0],
      admin: {
        id: newAdmin.rows[0].id,
        nom_utilisateur: newAdmin.rows[0].nom_utilisateur,
        email: newAdmin.rows[0].courriel,
        role: newAdmin.rows[0].role
      }
    });
  } catch (error) {
    console.error('Erreur lors de la création:', error);
    res.status(500).json({
      error: 'Une erreur est survenue lors de la création'
    });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'L\'email et le mot de passe sont requis'
      });
    }

    const entrepriseResult = await pool.query(
      'SELECT * FROM entreprises WHERE email_admin = $1',
      [email]
    );

    if (entrepriseResult.rows.length === 0) {
      return res.status(401).json({
        error: 'Identifiants incorrects'
      });
    }

    const entreprise = entrepriseResult.rows[0];

    const passwordMatch = await bcrypt.compare(password, entreprise.mot_de_passe);

    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Identifiants incorrects'
      });
    }

    const token = jwt.sign(
      {
        entrepriseId: entreprise.id,
        email: entreprise.email_admin,
        role: 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      entreprise: {
        id: entreprise.id,
        nom: entreprise.nom,
        domaine: entreprise.domaine,
        email_admin: entreprise.email_admin,
        logo_url: entreprise.logo_url
      }
    });

  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
    res.status(500).json({
      error: 'Erreur serveur lors de la tentative de connexion'
    });
  }
});

// Routes protégées
app.get('/users', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nom_utilisateur, courriel, role FROM users WHERE entreprise_id = $1',
      [req.user.entrepriseId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/users', authenticateToken, async (req, res) => {
  const { nom_utilisateur, courriel, password, role, prenom, nom } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      `INSERT INTO users 
      (nom_utilisateur, courriel, hachage_mot_de_passe, prenom, nom, role, entreprise_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id, nom_utilisateur, courriel, role`,
      [nom_utilisateur, courriel, hashedPassword, prenom, nom, role, req.user.entrepriseId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Gestion des signalements
app.get('/reports', authenticateToken, async (req, res) => {
  const { status } = req.query;
  
  try {
    let query = 'SELECT * FROM reports WHERE entreprise_id = $1';
    const params = [req.user.entrepriseId];
    
    if (status) {
      query += ' AND statut = $2';
      params.push(status);
    }
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/reports', authenticateToken, upload.single('photo'), async (req, res) => {
  const { type_signalement, description, zone_id, type_dechet } = req.body;
  const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;
  
  try {
    const result = await pool.query(
      `INSERT INTO reports 
      (type_signalement, description, url_photo, statut, user_id, entreprise_id, zone_id, type_dechet) 
      VALUES ($1, $2, $3, 'nouveau', $4, $5, $6, $7) 
      RETURNING *`,
      [type_signalement, description, photoUrl, req.user.id, req.user.entrepriseId, zone_id, type_dechet]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.put('/reports/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { statut } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE reports SET statut = $1, date_mise_a_jour = CURRENT_TIMESTAMP 
      WHERE id = $2 AND entreprise_id = $3 RETURNING *`,
      [statut, id, req.user.entrepriseId]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Signalement non trouvé' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Gestion des agents
app.get('/agents', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.prenom, u.nom, a.statut_agent, z.description AS zone_assignee 
      FROM agents a
      JOIN users u ON a.user_id = u.id
      LEFT JOIN zones z ON a.zone_assignee_id = z.id
      WHERE u.entreprise_id = $1`,
      [req.user.entrepriseId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Statistiques pour le dashboard
app.get('/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    // Récupération des statistiques de signalements
    const reportsStats = await pool.query(
      `SELECT 
        COUNT(*) FILTER (WHERE statut = 'nouveau') AS nouveaux,
        COUNT(*) FILTER (WHERE statut = 'valide') AS valides,
        COUNT(*) FILTER (WHERE statut = 'collecte') AS collectes
      FROM reports
      WHERE entreprise_id = $1`,
      [req.user.entrepriseId]
    );
    
    // Récupération des statistiques d'agents
    const agentsStats = await pool.query(
      `SELECT COUNT(*) AS agents_actifs
      FROM agents
      JOIN users ON agents.user_id = users.id
      WHERE users.entreprise_id = $1 AND agents.statut_agent = 'actif'`,
      [req.user.entrepriseId]
    );
    
    // Récupération des statistiques de collecte
    const collectionStats = await pool.query(
      `SELECT 
        SUM(poids_collecte_kg) AS total_collecte,
        COUNT(*) AS nombre_collectes
      FROM collections
      WHERE entreprise_id = $1`,
      [req.user.entrepriseId]
    );
    
    // Récupération de la répartition des déchets
    const wasteDistribution = await pool.query(
      `SELECT type_dechet, COUNT(*) AS count
      FROM reports
      WHERE entreprise_id = $1 AND type_dechet IS NOT NULL
      GROUP BY type_dechet`,
      [req.user.entrepriseId]
    );
    
    res.json({
      reports: reportsStats.rows[0],
      agents: agentsStats.rows[0],
      collections: collectionStats.rows[0],
      wasteDistribution: wasteDistribution.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Gestion des zones
app.get('/zones', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM zones WHERE entreprise_id = $1',
      [req.user.entrepriseId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/zones', authenticateToken, async (req, res) => {
  const { description, points_geojson } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO zones 
      (description, points_geojson, entreprise_id) 
      VALUES ($1, $2, $3) RETURNING *`,
      [description, points_geojson, req.user.entrepriseId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Gestion des collectes
app.post('/collections', authenticateToken, async (req, res) => {
  const { report_id, poids_collecte_kg } = req.body;
  
  try {
    // Créer la collecte
    const result = await pool.query(
      `INSERT INTO collections 
      (report_id, agent_id, poids_collecte_kg, entreprise_id) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [report_id, req.user.id, poids_collecte_kg, req.user.entrepriseId]
    );
    
    // Mettre à jour le statut du signalement
    await pool.query(
      `UPDATE reports SET statut = 'collecte' 
      WHERE id = $1 AND entreprise_id = $2`,
      [report_id, req.user.entrepriseId]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Gestion des conversations
app.get('/conversations', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, u.nom_utilisateur AS createur 
      FROM conversations c
      JOIN users u ON c.cree_par = u.id
      WHERE c.entreprise_id = $1`,
      [req.user.entrepriseId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/conversations', authenticateToken, async (req, res) => {
  const { sujet } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO conversations 
      (sujet, cree_par, entreprise_id) 
      VALUES ($1, $2, $3) RETURNING *`,
      [sujet, req.user.id, req.user.entrepriseId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Gestion des messages
app.get('/conversations/:id/messages', authenticateToken, async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      `SELECT m.*, u.nom_utilisateur AS expediteur 
      FROM messages m
      JOIN users u ON m.expediteur_id = u.id
      WHERE m.conversation_id = $1`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/conversations/:id/messages', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { contenu } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO messages 
      (conversation_id, expediteur_id, contenu, entreprise_id) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [id, req.user.id, contenu, req.user.entrepriseId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Gestion des ressources
app.get('/resources', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM resources WHERE entreprise_id = $1',
      [req.user.entrepriseId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});