import db from '../db-config';
import bcrypt from "bcrypt";
import User from "../types/user";

// Création de compte : retourne un User complet
export const createUser = async (
  user: Omit<User, 'id' | 'dateCreation' | 'dateMiseAJour'>
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(user.hachageMotDePasse, 10);
  const result = await db.query(
    `INSERT INTO users (nomUtilisateur, courriel, hachageMotDePasse, prenom, nom, role)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [user.nomUtilisateur, user.courriel, hashedPassword, user.prenom, user.nom, user.role]
  );
  return result.rows[0];
};

// Recherche par nomUtilisateur : peut retourner un User ou null
export const findUserByUsername = async (
  nomUtilisateur: string
): Promise<User | null> => {
  const result = await db.query(
    `SELECT * FROM users WHERE nomUtilisateur = $1`,
    [nomUtilisateur]
  );
  return result.rows[0] || null;
};
