import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, findUserByUsername } from "../models/userModel";
import { RequestHandler } from "express";

const authRouter = express.Router();


authRouter.post("/register", async (req: Request, res: Response) => {
    const { nomUtilisateur, courriel, motDePasse, prenom, nom } = req.body;

  try {
    const user = await createUser({
      nomUtilisateur,
      courriel,
      hachageMotDePasse: motDePasse,
      prenom,
      nom,
      role: "utilisateur"
    });

    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'inscription", details: err });
  }
});




const loginHandler: RequestHandler = async (req, res) => {
  const { nomUtilisateur, motDePasse } = req.body;

  const user = await findUserByUsername(nomUtilisateur);
  if (!user) {
    res.status(404).json({ error: "Utilisateur non trouvé" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(motDePasse, user.hachageMotDePasse);
  if (!isPasswordValid) {
    res.status(401).json({ error: "Mot de passe incorrect" });
    return;
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "2h" }
  );

  res.json({ message: "Connexion réussie", token });
};

authRouter.post("/login", loginHandler);

export default authRouter;
