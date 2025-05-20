-- Créer la base de données et l'utiliser
CREATE DATABASE IF NOT EXISTS jeux_societe;
USE jeux_societe;

-- Supprimer les tables si elles existent, dans le bon ordre (enfants ➔ parents)
DROP TABLE IF EXISTS Abonnements;
DROP TABLE IF EXISTS Notation;
DROP TABLE IF EXISTS Wishlist_Jeux;
DROP TABLE IF EXISTS Wishlist;
DROP TABLE IF EXISTS Jeu_Categorie;
DROP TABLE IF EXISTS Categorie;
DROP TABLE IF EXISTS Jeu;
DROP TABLE IF EXISTS Utilisateur;

-- Créer les tables

CREATE TABLE Utilisateur (
    ID_Utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Mot_de_passe VARCHAR(255) NOT NULL
);

CREATE TABLE Jeu (
    ID_Jeu INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL,
    Genre VARCHAR(255),
    Description TEXT,
    Note_moyenne FLOAT,
    Url VARCHAR(255),
    Image VARCHAR(255),
    Min_Joueurs INT,
    Max_Joueurs INT,
    Duree VARCHAR(50),
    Age VARCHAR(10),
    Est_Loue BOOLEAN DEFAULT FALSE
);

CREATE TABLE Categorie ( 
    ID_Categorie INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(255) NOT NULL
);

CREATE TABLE Wishlist (
    ID_Wishlist INT AUTO_INCREMENT PRIMARY KEY,
    ID_Utilisateur INT NOT NULL,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur) ON DELETE CASCADE
);

CREATE TABLE Jeu_Categorie (
    ID_Jeu INT,
    ID_Categorie INT,
    PRIMARY KEY (ID_Jeu, ID_Categorie),
    FOREIGN KEY (ID_Jeu) REFERENCES Jeu(ID_Jeu) ON DELETE CASCADE,
    FOREIGN KEY (ID_Categorie) REFERENCES Categorie(ID_Categorie) ON DELETE CASCADE
);

CREATE TABLE Wishlist_Jeux (
    ID_Wishlist INT,
    ID_Jeu INT,
    PRIMARY KEY (ID_Wishlist, ID_Jeu),
    FOREIGN KEY (ID_Wishlist) REFERENCES Wishlist(ID_Wishlist) ON DELETE CASCADE,
    FOREIGN KEY (ID_Jeu) REFERENCES Jeu(ID_Jeu) ON DELETE CASCADE
);

CREATE TABLE Notation (
    ID_Utilisateur INT,
    ID_Jeu INT,
    Note INT CHECK (Note >= 0 AND Note <= 10),
    Commentaire TEXT,
    Date DATE,
    PRIMARY KEY (ID_Utilisateur, ID_Jeu),
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateur(ID_Utilisateur) ON DELETE CASCADE,
    FOREIGN KEY (ID_Jeu) REFERENCES Jeu(ID_Jeu) ON DELETE CASCADE
);

CREATE TABLE Abonnements (
    ID_Utilisateur_abonne INT,
    ID_Utilisateur_abonnement INT,
    Date DATE,
    PRIMARY KEY (ID_Utilisateur_abonne, ID_Utilisateur_abonnement),
    FOREIGN KEY (ID_Utilisateur_abonne) REFERENCES Utilisateur(ID_Utilisateur) ON DELETE CASCADE,
    FOREIGN KEY (ID_Utilisateur_abonnement) REFERENCES Utilisateur(ID_Utilisateur) ON DELETE CASCADE
);

-- Insertions dans la table Jeu
INSERT INTO Jeu (ID_Jeu, Nom, Genre, Description, Note_moyenne, Url, Image, Min_Joueurs, Max_Joueurs, Duree, Age, Est_Loue) VALUES
(NULL, 'Pandemic', NULL,
'In Pandemic, several virulent diseases have broken out simultaneously all over the world! The players are disease-fighting specialists whose mission is to treat disease hotspots while researching cures for each of four plagues before they get out of hand. The game board depicts several major population centers on Earth. On each turn, a player can use up to four actions to travel between cities, treat infected populaces, discover a cure, or build a research station. A deck of cards provides the players with these abilities, but sprinkled throughout this deck are Epidemic! cards that accelerate and intensify the diseases activity. A second, separate deck of cards controls the normal spread of the infections. Taking a unique role within the team, players must plan their strategy to mesh with their specialists strengths in order to conquer the diseases.',
7.57,
'https://boardgamegeek.com/boardgame/30549/pandemic',
'https://cf.geekdo-images.com/0dgZ00R4Eo35vFpwGZmYdg__thumb/img/pJVoMc0NqtvRTgq-vobBVVZcdas=/fit-in/200x150/filters:strip_icc()/pic2452831.jpg',
4, 4, NULL, '10', FALSE),

(NULL, 'Dominion', NULL,
'Dominion (Second Edition), released in 2016, replaced the original base game of Dominion. It includes updates to several cards and rule refinements based on years of gameplay feedback.',
7.6,
'https://boardgamegeek.com/boardgame/36218/dominion',
'https://cf.geekdo-images.com/3nG1J9aB8OsX97d4uM4rdA__thumb/img/fFTdJVDWmSlpHkfh-oYyNQdtq7k=/fit-in/200x150/filters:strip_icc()/pic3312156.jpg',
2, 4, NULL, '13', FALSE),

(NULL, '7 Wonders Duel', NULL,
'In 7 Wonders Duel, each player is leading a civilization and will, over the course of three ages, construct buildings and wonders. In many ways, 7 Wonders Duel resembles its parent game 7 Wonders as over three ages players acquire cards that provide resources or advance their military or scientific development in order to develop a civilization and complete wonders.',
8.1,
'https://boardgamegeek.com/boardgame/173346/7-wonders-duel',
'https://cf.geekdo-images.com/pZx4UeMS9K4TzBO2JVR2Zw__thumb/img/ahzGUDi1Sso5X-ETUkCDHMe38Xs=/fit-in/200x150/filters:strip_icc()/pic3376065.jpg',
2, 2, NULL, '10', FALSE),

(NULL, 'Terraforming Mars', NULL,
'In Terraforming Mars, you play one of several corporations with different characteristics. You work together in the terraforming process, but compete for getting victory points awarded not only for your contribution to the terraforming, but also for advancing human infrastructure throughout the solar system.',
8.4,
'https://boardgamegeek.com/boardgame/167791/terraforming-mars',
'https://cf.geekdo-images.com/xDd2QeMevZLmlU6T2Fxtcg__thumb/img/YsFRKMtRWFCQw1IFDtGOn3POT7o=/fit-in/200x150/filters:strip_icc()/pic3536616.jpg',
1, 5, NULL, '12', FALSE),

(NULL, 'Ticket to Ride: Europe', NULL,
'Ticket to Ride: Europe takes you on a train adventure to the great cities of turn-of-the-century Europe. From Edinburgh to Constantinople and from Lisbon to Moscow, you will visit cities across Europe. Like the original Ticket to Ride, the game is elegantly simple, can be learned in five minutes, and appeals to both families and experienced gamers.',
7.9,
'https://boardgamegeek.com/boardgame/14996/ticket-ride-europe',
'https://cf.geekdo-images.com/sLbL2_3k4dPtR8KM7cXarA__thumb/img/gNOz8aGegm_yG71lKu4bOaZmkjU=/fit-in/200x150/filters:strip_icc()/pic66668.jpg',
2, 5, NULL, '8', FALSE);

-- Insertions dans la table Utilisateur
INSERT INTO Utilisateur (Nom, Email, Mot_de_passe) VALUES 
('Alice Dupont', 'alice@example.com', 'mdp123'),
('Bob Martin', 'bob@example.com', 'bobpass'),
('Chloe Mercier', 'chloe@example.com', 'chloe42');

-- Insertions dans la table Categorie
INSERT INTO Categorie (ID_Categorie, Nom) VALUES 
(1, 'Stratégie'),
(2, 'Famille'),
(3, 'Cartes');

-- Associations Jeu-Categorie
INSERT INTO Jeu_Categorie (ID_Jeu, ID_Categorie) VALUES 
(1, 1),
(1, 2),
(2, 2),
(3, 1),
(4, 1),
(5, 2);

-- Insertions dans la table Wishlist
INSERT INTO Wishlist (ID_Wishlist, ID_Utilisateur) VALUES 
(1, 1),
(2, 2),
(3, 3);

-- Associations Wishlist-Jeux
INSERT INTO Wishlist_Jeux (ID_Wishlist, ID_Jeu) VALUES 
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 2),
(3, 5);

-- Insertions dans la table Notation
INSERT INTO Notation (ID_Utilisateur, ID_Jeu, Note, Commentaire, Date) VALUES 
(1, 1, 9, 'Excellent jeu coopératif', '2024-04-01'),
(2, 2, 7, 'Bon jeu de cartes, rapide', '2024-04-03'),
(3, 3, 8, 'Très stratégique et équilibré', '2024-04-05');

CREATE VIEW V_Jeux_Par_Categorie AS
SELECT 
    j.Nom AS Nom_Jeu,
    c.Nom AS Nom_Categorie
FROM 
    Jeu j
JOIN 
    Jeu_Categorie jc ON j.ID_Jeu = jc.ID_Jeu
JOIN 
    Categorie c ON c.ID_Categorie = jc.ID_Categorie;
    
CREATE VIEW V_Wishlist_Jeux AS
SELECT 
    u.Nom AS Utilisateur,
    j.Nom AS Nom_Jeu
FROM 
    Wishlist w
JOIN 
    Wishlist_Jeux wj ON w.ID_Wishlist = wj.ID_Wishlist
JOIN 
    Jeu j ON wj.ID_Jeu = j.ID_Jeu
JOIN
    Utilisateur u ON w.ID_Utilisateur = u.ID_Utilisateur;
    
CREATE VIEW V_Notes_Utilisateurs AS
SELECT 
    u.Nom AS Utilisateur,
    j.Nom AS Nom_Jeu,
    n.Note,
    n.Commentaire,
    n.Date
FROM 
    Notation n
JOIN 
    Utilisateur u ON n.ID_Utilisateur = u.ID_Utilisateur
JOIN 
    Jeu j ON n.ID_Jeu = j.ID_Jeu;
    
    
CREATE INDEX idx_nom_jeu ON Jeu(Nom);
CREATE INDEX idx_nom_categorie ON Categorie(Nom);
CREATE INDEX idx_email_utilisateur ON Utilisateur(Email);

DELIMITER //

CREATE TRIGGER tr_update_note_moyenne
AFTER INSERT ON Notation
FOR EACH ROW
BEGIN
    UPDATE Jeu
    SET Note_moyenne = (
        SELECT AVG(Note)
        FROM Notation
        WHERE ID_Jeu = NEW.ID_Jeu
    )
    WHERE ID_Jeu = NEW.ID_Jeu;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER tr_delete_wishlist_on_user_delete
AFTER DELETE ON Utilisateur
FOR EACH ROW
BEGIN
    DELETE FROM Wishlist
    WHERE ID_Utilisateur = OLD.ID_Utilisateur;
END //

DELIMITER ;

CREATE TABLE Log_Wishlist (
    ID_Log INT AUTO_INCREMENT PRIMARY KEY,
    ID_Wishlist INT,
    ID_Jeu INT,
    Date_Ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //

CREATE TRIGGER tr_log_wishlist_addition
AFTER INSERT ON Wishlist_Jeux
FOR EACH ROW
BEGIN
    INSERT INTO Log_Wishlist (ID_Wishlist, ID_Jeu)
    VALUES (NEW.ID_Wishlist, NEW.ID_Jeu);
END //

DELIMITER ;

-- Ajouter un jeu à une wishlist
DELIMITER //

CREATE PROCEDURE Ajouter_Jeu_Wishlist(
    IN p_ID_Wishlist INT,
    IN p_ID_Jeu INT
)
BEGIN
    INSERT INTO Wishlist_Jeux (ID_Wishlist, ID_Jeu)
    VALUES (p_ID_Wishlist, p_ID_Jeu);
END //

DELIMITER ;

-- Supprimer un jeu d'une wishlist
DELIMITER //

CREATE PROCEDURE Supprimer_Jeu_Wishlist(
    IN p_ID_Wishlist INT,
    IN p_ID_Jeu INT
)
BEGIN
    DELETE FROM Wishlist_Jeux
    WHERE ID_Wishlist = p_ID_Wishlist
    AND ID_Jeu = p_ID_Jeu;
END //

DELIMITER ;

-- Lister les jeux avec une bonne note
DELIMITER //

CREATE PROCEDURE Lister_Jeux_Bonne_Note(
    IN p_note_minimum FLOAT
)
BEGIN
    SELECT Nom, Note_moyenne
    FROM Jeu
    WHERE Note_moyenne >= p_note_minimum
    ORDER BY Note_moyenne DESC;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE Louer_Jeu(
    IN p_ID_Jeu INT
)
BEGIN
    UPDATE Jeu
    SET Est_Loue = TRUE
    WHERE ID_Jeu = p_ID_Jeu
    AND Est_Loue = FALSE;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE Retourner_Jeu(
    IN p_ID_Jeu INT
)
BEGIN
    UPDATE Jeu
    SET Est_Loue = FALSE
    WHERE ID_Jeu = p_ID_Jeu
    AND Est_Loue = TRUE;
END //

DELIMITER ;

DELIMITER //

CREATE FUNCTION Nombre_Jeux_Disponibles()
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE nb INT;
    
    SELECT COUNT(*)
    INTO nb
    FROM Jeu
    WHERE Est_Loue = FALSE;

    RETURN nb;
END //

DELIMITER ;