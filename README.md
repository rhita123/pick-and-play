# Pick & Play

**Pick & Play** est une application web de gestion de jeux de société, développée en fullstack avec Vue.js, Node.js et MySQL. Elle permet aux utilisateurs de consulter des jeux, les noter, commenter, louer et gérer leur wishlist. Les administrateurs peuvent quant à eux gérer le catalogue complet (ajouter, modifier, supprimer des jeux).

Projet réalisé dans le cadre du module **Base de Données Avancées** à l’Efrei.

Membres du groupe **I-11** :
- Rhita Moummade  
- Anaïs Robert  
- Begum Sozer
---

## Fonctionnalités principales

###  Authentification & rôles
- Inscription avec rôle (admin ou utilisateur)
- Connexion sécurisée (JWT + bcrypt)
- Redirection selon le rôle (admin vs user)

###  Catalogue de jeux
- Liste des jeux disponibles avec image, note moyenne et détails
- Filtres (par note, type, etc.)
- Recherche par nom

###  Détail d’un jeu
- Affichage de toutes les informations :
  - Nom, image, description, durée, nombre de joueurs, âge
- Note sur 10 par les utilisateurs
- Commentaires avec suppression/modification

###  Wishlist
- Ajouter ou retirer un jeu de la wishlist
- Affichage personnalisé de la wishlist par utilisateur

###  Espace admin
- Ajouter un jeu avec formulaire complet
- Modifier ou supprimer un jeu
- Visualisation des locations

###  Location
- Bouton "Louer ce jeu"
- Nombre de locations visibles dans le dashboard admin

###  Commentaires & Notes
- Système de notation (/10) mis à jour dynamiquement
- Système de commentaires modifiables et supprimables

---

##  Base de données MySQL

###  Tables principales :
- `Utilisateur`, `Jeu`, `Notation`, `Commentaire`, `Wishlist`, `Location`

###  Fonctions avancées utilisées :
- **Procédures stockées** (ex : `Ajouter_Jeu_Wishlist`)
-  **Triggers** (ex : `tr_update_note_moyenne`)
-  **Vues SQL** (ex : `V_Notes_Utilisateurs`)
-  **Index** pour améliorer les performances (ex : `idx_id_utilisateur` sur `Wishlist`)

---

##  Stack technique

| Frontend      | Backend     | BDD        |
|---------------|-------------|------------|
| Vue.js        | Node.js     | MySQL      |
| Vue Router    | Express.js  | Procedures |
| Axios         | JWT Auth    | Triggers   |
| Tailwind CSS  | Bcrypt      | Vues SQL   |

---

## ⚙️ Installation locale

```bash
# Clone le repo
git clone https://github.com/rhita123/pick-and-play.git

# Installe les dépendances backend
cd server
npm install

# Installe les dépendances frontend
cd ../client
npm install

# Démarre le serveur (depuis /server)
node server.js

# Lance le frontend (depuis /client)
npm run serve











