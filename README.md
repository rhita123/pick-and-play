# Pick&Play – Catalogue interactif de jeux de société

Pick&Play est une application web permettant aux utilisateurs de découvrir, noter, commenter et sauvegarder des jeux de société dans une wishlist personnelle. L’objectif est de faciliter la recherche de jeux adaptés à tous les profils de joueurs, tout en offrant une interface intuitive et accessible.

---

##  Fonctionnalités

### Pour tous les utilisateurs :
-  Parcourir un catalogue de jeux
-  Filtrer par nombre de joueurs, âge minimum, catégories, etc.
-  Voir une fiche détaillée d’un jeu
-  Noter et commenter des jeux
-  Ajouter et retirer des jeux de leur wishlist
-  Consulter leur propre wishlist

### Pour les administrateurs :
-  Ajouter un nouveau jeu
-  Modifier les informations d’un jeu
-  Supprimer un jeu du catalogue
-  Marquer un jeu comme "loué" ou "disponible"

---

##  Stack technique

### Frontend
- HTML / CSS / JavaScript
- Vue.js (Vite ou Vue CLI)

### Backend
- Node.js + Express 
- Connexion MySQL avec drivers adaptés

### Base de données
- MySQL
- Procédures stockées, triggers et vues SQL optimisées
- Script complet dans `livrable3.sql`

---

##  Structure du projet

```bash
pick-and-play/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── views/
│      
├── backend/
│   └── routes/
│   └── models/
│   └── controllers/
│   
├── livrables/
│   ├── livrable1.pdf
│   ├── livrable2.pdf
│   ├── livrable3.pdf
│   └── livrable3.sql
├── README.md














