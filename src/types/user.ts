interface User {
  id: number;
  nomUtilisateur: string;
  courriel: string;
  hachageMotDePasse: string;
  prenom: string;
  nom: string;
  role: 'utilisateur' | 'agent' | 'administrateur';
  dateCreation: Date;
  dateMiseAJour: Date;
}

export default User;
