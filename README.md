
# Duneko — Plateforme de Gestion Intelligente des Déchets ♻️

**Lauréat GAIA 2025**

## Présentation

Duneko est une solution tout‑en‑un pour faciliter et optimiser la gestion des déchets :

- **API Backend**  
  Node.js • Express • PostgreSQL (+ PostGIS)  
  Expose les endpoints REST pour gérer utilisateurs, signalements et actions.

- **Dashboard Web**  
  React • Vite • Tailwind CSS  
  Supervision en temps réel des signalements et des statistiques.

- **Applications Mobiles**  
  - **Citoyen** (React Native + Expo)  
    Permet de déclarer un signalement géolocalisé avec photo.  
  - **Agent** (React Native + Expo)  
    Outil terrain pour suivre, prendre en charge et clôturer les signalements.

## Architecture



## Installation locale

### Prérequis

- Node.js ≥ 18  
- PNPM ou npm  
- PostgreSQL ≥ 14  
- (Expo CLI pour les apps mobiles)

### API Backend

git clone https://github.com/King-Ephraim/GAIA_PROJECT.git --branch api
cd GAIA_PROJECT
pnpm install
cp .env.example .env

# Remplir vos variables PostgreSQL et JWT_SECRET
pnpm dev

### Dashboard Web

git clone https://github.com/King-Ephraim/GAIA_PROJECT.git --branch siruto duneko_web
cd duneko_web
pnpm install
pnpm dev

Accès dashboard : `http://localhost:5173`

### Applications Mobiles

#### Citoyen

git clone https://github.com/King-Ephraim/GAIA_PROJECT.git --branch app-citoyen app_citoyen
cd app_citoyen
pnpm install
npx expo start

#### Agent

git clone https://github.com/King-Ephraim/GAIA_PROJECT.git --branch collecte-agent app_agent
cd app_agent
pnpm install
npx expo start

## Roadmap

1. **Connecter les apps mobiles**

   * Authentification (JWT)
   * Endpoints `/reports` et `/actions`
2. **Tableaux de bord** : filtres, export CSV
3. **Déploiement** : Docker / Kubernetes / Cloud
4. **Notifications push** (WebSocket / FCM)
5. **Améliorations UX/UI** et accessibilité (WCAG 2.1)

## Contribuer

1. Forker le dépôt
2. Créer une branche `feature/xxx`
3. Développer et tester
4. Ouvrir une Pull Request ciblant `main`
5. Soumettre pour revue


## Équipe

| Rôle                 | Contact                                                 |
| -------------------- | ------------------------------------------------------- |
| Backend              | [api@duneko.gaia](mailto:api@duneko.gaia)               |
| Frontend Dashboard   | [web@duneko.gaia](mailto:web@duneko.gaia)               |
| Mobile (Citizen)     | [citizen@duneko.gaia](mailto:citizen@duneko.gaia)       |
| Mobile (Agent)       | [agent@duneko.gaia](mailto:agent@duneko.gaia)           |
| Product / Management | [management@duneko.gaia](mailto:management@duneko.gaia) |

## Illustrations de l’application

## Logo

![image1](image/image2.jpeg) 

Voici quelques captures d’écran du projet :
## Illustrations de l’application web 

![image1](image/image1.png)  
![image2](image/image2.png)  
![image3](image/image3.png)  
![image4](image/image4.png)  
![image5](image/image5.png)  
![image6](image/image6.png)  
![image7](image/image7.png)  
![image8](image/image8.png)  
![image9](image/image9.png)  
![image10](image/image10.png)  
![image11](image/image11.png)  
![image12](image/image12.png)  
![image13](image/image13.png)  
![image14](image/image14.png)  
![image15](image/image15.png)  
![image16](image/image16.png)  
![image17](image/image17.svg)  

## Illustrations de l’application mobile
 
![image2](image/image3.jpeg)  
![image3](image/image4.jpeg)  
![image4](image/image5.jpeg)  
![image5](image/image6.jpeg) 
![image6](image/image7.jpeg) 
![image7](image/image8.jpeg) 
![image8](image/image9.jpeg) 
![image9](image/image10.jpeg) 


