-- Create the database
CREATE DATABASE IF NOT EXISTS CocktailDB;

-- Use the database
USE CocktailDB;

-- Drop existing tables to avoid conflicts
DROP TABLE IF EXISTS cocktail_ingredients;
DROP TABLE IF EXISTS serves;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS cocktails;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS employees;
-- Create EMPLOYEES table
CREATE TABLE Employees(
    EmployeesID INT AUTO_INCREMENT PRIMARY KEY,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    Username VARCHAR(100) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Status ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Active',
    DateOfBirth DATE
);

-- Create RESTAURANTS table
CREATE TABLE RESTAURANTS (
    RestaurantID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Category VARCHAR(50),
    Location VARCHAR(255),
    Rating DECIMAL(3, 2),
    Average_price DECIMAL(10, 2)
);

-- Create USERS table
CREATE TABLE IF NOT EXISTS USERS (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) UNIQUE NOT NULL,
    user_email VARCHAR(100) UNIQUE NOT NULL,
    user_pass VARCHAR(255) NOT NULL,
    user_role ENUM('User', 'Admin') DEFAULT 'User',
    user_created DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create INGREDIENTS table
CREATE TABLE INGREDIENTS (
    IngredientID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Type VARCHAR(100),
    Origin VARCHAR(100),
    SeasonalAvailability VARCHAR(100),
    Price DECIMAL(10, 2) NOT NULL CHECK (Price > 0)
);

-- Create COCKTAILS table
CREATE TABLE COCKTAILS (
    CocktailID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Category VARCHAR(100),
    PreparationTime INT NOT NULL,
    Difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
    Origin VARCHAR(100)
);

-- Create COCKTAIL_INGREDIENTS table
CREATE TABLE COCKTAIL_INGREDIENTS (
    ConnectionID INT AUTO_INCREMENT PRIMARY KEY,
    CocktailID INT NOT NULL,
    IngredientID INT NOT NULL,
    Quantity DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (CocktailID) REFERENCES COCKTAILS(CocktailID) ON DELETE CASCADE,
    FOREIGN KEY (IngredientID) REFERENCES INGREDIENTS(IngredientID) ON DELETE CASCADE
);

-- Create SERVES table
CREATE TABLE SERVES (
    ConnectionID INT AUTO_INCREMENT PRIMARY KEY,
    RestaurantID INT NOT NULL,
    CocktailID INT NOT NULL,
    FOREIGN KEY (RestaurantID) REFERENCES RESTAURANTS(RestaurantID) ON DELETE CASCADE,
    FOREIGN KEY (CocktailID) REFERENCES COCKTAILS(CocktailID) ON DELETE CASCADE
);

-- Sample data insertion
-- Insert data for Employees
INSERT INTO Employees (Username, Email, PasswordHash, Status, DateOfBirth) VALUES
    ('JohnDoe', 'john.doe@example.com', SHA2('password123', 256), 'Active', '1990-05-15'),
    ('JaneSmith', 'jane.smith@example.com', SHA2('securepass456', 256), 'Active', '1985-11-20'),
    ('AlexBrown', 'alex.brown@example.com', SHA2('pass789', 256), 'Active', '1992-07-12'),
    ('EmilyClark', 'emily.clark@example.com', SHA2('password321', 256), 'Active', '1988-03-25'),
    ('MichaelBlue', 'michael.blue@example.com', SHA2('mypass111', 256), 'Suspended', '1975-08-19'),
    ('SophiaGreen', 'sophia.green@example.com', SHA2('sophia123', 256), 'Active', '1995-12-10'),
    ('DanielWhite', 'daniel.white@example.com', SHA2('secure123', 256), 'Inactive', '1990-04-22');


-- Insert data for RESTAURANTS
INSERT INTO RESTAURANTS (Name, Category, Location, Rating, Average_price) VALUES
    ('Cocktail Haven', 'Bar', 'Downtown', 4.5, 25.00),
    ('Mixology Bar', 'Bar', 'Uptown', 4.8, 30.00),
    ('The Tiki Lounge', 'Beach Bar', 'Beachfront', 4.2, 20.00),
    ('Skyline Bar', 'Luxury Bar', 'City Center', 4.9, 50.00),
    ('Vintage Cocktails', 'Classic Bar', 'Old Town', 4.7, 35.00),
    ('Night Owl Bar', 'Late-Night Bar', 'Suburbs', 4.1, 15.00);

-- Insert sample data for USERS
INSERT INTO USERS (user_name, user_email, user_pass, user_role) VALUES
    ('alicewalker', 'alice.walker@example.com', SHA2(CONCAT(NOW(), 'passwordAlice123'), 224), 'User'),
    ('bobsmith', 'bob.smith@example.com', SHA2(CONCAT(NOW(), 'passwordBob321'), 224), 'User'),
    ('charliewhite', 'charlie.white@example.com', SHA2(CONCAT(NOW(), 'passwordCharlie456'), 224), 'Admin'),
    ('dianablack', 'diana.black@example.com', SHA2(CONCAT(NOW(), 'passwordDiana789'), 224), 'User'),
    ('ericjohnson', 'eric.johnson@example.com', SHA2(CONCAT(NOW(), 'passwordEric567'), 224), 'User'),
    ('fionagreen', 'fiona.green@example.com', SHA2(CONCAT(NOW(), 'passwordFiona234'), 224), 'Admin'),
    ('georgemiller', 'george.miller@example.com', SHA2(CONCAT(NOW(), 'passwordGeorge678'), 224), 'User'),
    ('hannahbrown', 'hannah.brown@example.com', SHA2(CONCAT(NOW(), 'passwordHannah890'), 224), 'User');

-- Insert data for INGREDIENTS
INSERT INTO INGREDIENTS (Name, Type, Origin, SeasonalAvailability, Price) VALUES
    ('Rum', 'Spirit', 'Caribbean', 'Year-Round', 25.00),
    ('Lime', 'Fruit', 'Mexico', 'Summer', 0.50),
    ('Gin', 'Spirit', 'England', 'Year-Round', 20.00),
    ('Mint', 'Herb', 'Worldwide', 'Spring', 0.30),
    ('Sugar Syrup', 'Sweetener', 'Global', 'Year-Round', 2.00),
    ('Tequila', 'Spirit', 'Mexico', 'Year-Round', 22.50),
    ('Orange Juice', 'Juice', 'Florida', 'Winter', 3.50),
    ('Triple Sec', 'Liqueur', 'France', 'Year-Round', 18.00);

-- Insert data for COCKTAILS
INSERT INTO COCKTAILS (Name, Category, PreparationTime, Difficulty, Origin) VALUES
    ('Margarita', 'Classic', 10, 'Medium', 'Mexico'),
    ('Mojito', 'Classic', 8, 'Easy', 'Cuba'),
    ('Cosmopolitan', 'Classic', 7, 'Easy', 'USA'),
    ('Pina Colada', 'Tropical', 12, 'Medium', 'Puerto Rico'),
    ('Old Fashioned', 'Classic', 8, 'Hard', 'USA'),
    ('Tequila Sunrise', 'Tropical', 5, 'Easy', 'Mexico');

-- Insert data for COCKTAIL_INGREDIENTS
INSERT INTO COCKTAIL_INGREDIENTS (CocktailID, IngredientID, Quantity) VALUES
    (1, 1, 1.0),
    (1, 2, 0.5),
    (3, 3, 1.5),
    (4, 4, 2.0),
    (4, 5, 0.5),
    (5, 6, 2.0),
    (6, 7, 1.0),
    (6, 8, 0.5),
    (6, 9, 0.25);


-- Example query for cocktails with total ingredient cost
CREATE VIEW CocktailsWithIngredientCost AS
SELECT 
    c.CocktailID,
    c.Name AS CocktailName,
    SUM(ci.Quantity * i.Price) AS TotalIngredientCost
FROM COCKTAILS c
LEFT JOIN COCKTAIL_INGREDIENTS ci ON c.CocktailID = ci.CocktailID
LEFT JOIN INGREDIENTS i ON ci.IngredientID = i.IngredientID
GROUP BY c.CocktailID;



