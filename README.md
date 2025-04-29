 Popcorn & Opinions

Une plateforme communautaire pour publier, noter et commenter des films et séries — pensée avec une démarche éco-conçue dans le cadre du projet de Green IT.

Objectif du projet

**Popcorn & Opinions** a été développé dans le cadre du MiniProjet Green IT 2024-2025 à l’Efrei Paris.  

L’objectif est de créer un site web fonctionnel tout en analysant et optimisant son **empreinte carbone**, à travers des outils et pratiques d’éco-conception numérique.

Équipe projet

- **Rhita Moummade**  
- **Anaïs Robert**  
- **Begüm Sözer**

Fonctionnalités principales

	•	Création de comptes utilisateurs (inscription/connexion sécurisées)
	•	Rôles : utilisateur classique / administrateur
	•	Espace d’administration (gestion et suppression de comptes)
	•	Publication de critiques de films/séries
	•	Notation des œuvres (système de 5 étoiles)
	•	Commentaires sous les critiques
	•	Recherche, tri et filtrage des contenus
	•	Version optimisée éco-conçue après audit (réduction poids, requêtes, performances)

 Technologies utilisées

	Frontend : Vue.js (HTML / CSS / JavaScript)
	•	Backend : Node.js + Express
	•	Base de données : MySQL
	•	Éco-conception : bonnes pratiques green IT


Analyse Green IT

- Estimation de l’empreinte carbone du site (avant/après optimisation)
- Réduction de l’impact via : compression des assets, lazy loading, design épuré, limitation des appels serveur

  Installation du projet

**  Cloner le dépôt **
git clone https://github.com/rhita123/-Popcorn-Opinions.git
cd -Popcorn-Opinions

** Lancer le backend ** 

cd server
npm install
node server.js

 Le serveur tourne sur : http://localhost:5050

Lancer le frontend 

cd client
npm install
npm run serve

Le client tourne sur : http://localhost:8080

Base de données 

Le fichier SQL est fourni dans le dossier /database/popcorn_opinions.sql.

Pour installer la base :
1.	Ouvrir MySQL
2.	Créer une base de données :
3.	Importer le fichier .sql :

CREATE DATABASE popcorn_opinions;
mysql -u root -p popcorn_opinions < database/popcorn_opinions.sql












