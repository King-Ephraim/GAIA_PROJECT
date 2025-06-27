# CollectionDechet

> Application mobile  développée avec Expo (React Native) pour la gestion et le suivi des signalements de collecte de déchets. Elle permet aux agents de visualiser les points sur une carte, d'accéder aux détails et de suivre leur progression.




# Fonctionnalités

*   Multi-plateforme : Android et IOS grâce à Expo.
*   Routage Typé :** Navigation robuste et sécurisée basée sur les fichiers avec Expo Router.
*   Carte Interactive : Visualisation des signalements sur une carte via react-native-maps.
*   Détails du Signalement :
    *   Affichage complet : photo, adresse, statut (urgent/non-collecté).
    *   Possibilité de marquer un signalement comme "collecté".
    *   Lancement de l'itinéraire vers le point via Google Maps.
*   Interface Intuitive :** Navigation par onglets en bas de l'écran.


##  Technologies utilisées

*   Base : React Native avec expo Router 
*   Langage : React Native avec expo
*   Routage : [Expo Router v3](https://docs.expo.dev/router/introduction/)
*   Cartographie : [react-native-maps] commande:
*   Icônes : [react-native-vector-icons] commande: 



# Prérequis

*   Node.js(https://nodejs.org/) 
*   npm (https://www.npmjs.com/)
   L'application **Expo Go** sur votre téléphone (iOS ou Android) pour tester sur un appareil physique.
    *   Télécharger pour iOS(https://apps.apple.com/us/app/expo-go/id982107779)
    *   Télécharger pour Android(https://play.google.com/store/apps/details?id=host.exp.exponent)

##  Installation

1.  Clonez le dépôt
    git clone https://github.com/King-Ephraim/GAIA_PROJECT.git
    cd collectionDechet
 

2.  Installez les dépendances
    npm install

3. Installation des icones et maps

    expo install react-native-maps
	
   expo install @expo/vector-icons

 Lancer l'application en développement

1.  Démarrez le serveur de développement Expo
    npx expo start
    

2.  Choisissez comment lancer l'application
    Un terminal interactif et une page web (Expo Dev Tools) s'ouvriront avec un QR code.

    *   Sur votre téléphone  :Ouvrez l'application **Expo Go** et scannez le QR code.
    *   Sur un simulateur iOS (macOS requis) : Appuyez sur la touche `i` dans le terminal.
    *   Sur un émulateur Android : Appuyez sur la touche `a` dans le terminal.
    *   Dans votre navigateur web : Appuyez sur la touche `w` dans le terminal.


# Structure des dossiers (avec Expo Router)

Le projet utilise Expo Router, qui se base sur la structure du dossier `app/` pour définir les routes.

collectionDechet/
├── app/ # Dossier principal pour les routes et écrans
│ ├── (tabs)/ # Groupe de routes pour la navigation par onglets
│ │ ├── _layout.tsx # Fichier de layout pour la barre d'onglets
│ │ ├── home.tsx # Écran d'accueil (route: /)
│ │ ├── map.tsx # Écran carte (route: /map)
│ │ ├── tours.tsx # Écran tournées (route: /tours)
│ │ └── StatsScreen.tsx #Ecran de statistique 
| | ├── Profil.tsx # Profil de l'agent de collecte 
| │ ├── DetailSignalement# Plus detail sur le signalement, la position 
	
│ ├── _layout.tsx # Layout principal de l'application
│ └── index.tsx # Point d'entrée, redirige souvent vers (tabs)
├── assets/ # Images, icônes, polices
│ └── images/
├── components/ # Composants React réutilisables (ex: CustomNavBar)
├── .env # Variables d'environnement (non versionné)
└── app.json # Fichier de configuration d'Expo