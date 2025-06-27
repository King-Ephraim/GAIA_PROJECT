"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel");
const authRouter = express_1.default.Router();
authRouter.post("/register", async (req, res) => {
    const { nomUtilisateur, courriel, motDePasse, prenom, nom } = req.body;
    try {
        const user = await (0, userModel_1.createUser)({
            nomUtilisateur,
            courriel,
            hachageMotDePasse: motDePasse,
            prenom,
            nom,
            role: "utilisateur"
        });
        res.status(201).json({ message: "Utilisateur créé", user });
    }
    catch (err) {
        res.status(500).json({ error: "Erreur lors de l'inscription", details: err });
    }
});
const loginHandler = async (req, res) => {
    const { nomUtilisateur, motDePasse } = req.body;
    const user = await (0, userModel_1.findUserByUsername)(nomUtilisateur);
    if (!user) {
        res.status(404).json({ error: "Utilisateur non trouvé" });
        return;
    }
    const isPasswordValid = await bcrypt_1.default.compare(motDePasse, user.hachageMotDePasse);
    if (!isPasswordValid) {
        res.status(401).json({ error: "Mot de passe incorrect" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.json({ message: "Connexion réussie", token });
};
authRouter.post("/login", loginHandler);
exports.default = authRouter;
