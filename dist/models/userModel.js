"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByUsername = exports.createUser = void 0;
const db_config_1 = __importDefault(require("../db-config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Création de compte : retourne un User complet
const createUser = async (user) => {
    const hashedPassword = await bcrypt_1.default.hash(user.hachageMotDePasse, 10);
    const result = await db_config_1.default.query(`INSERT INTO users (nomUtilisateur, courriel, hachageMotDePasse, prenom, nom, role)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [user.nomUtilisateur, user.courriel, hashedPassword, user.prenom, user.nom, user.role]);
    return result.rows[0];
};
exports.createUser = createUser;
// Recherche par nomUtilisateur : peut retourner un User ou null
const findUserByUsername = async (nomUtilisateur) => {
    const result = await db_config_1.default.query(`SELECT * FROM users WHERE nomUtilisateur = $1`, [nomUtilisateur]);
    return result.rows[0] || null;
};
exports.findUserByUsername = findUserByUsername;
