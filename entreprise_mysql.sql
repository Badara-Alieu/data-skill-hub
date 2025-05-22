
-- Script PostgreSQL : entreprise_db

-- Suppression préalable (si nécessaire)
DROP TABLE IF EXISTS employes_projets;
DROP TABLE IF EXISTS projets;
DROP TABLE IF EXISTS employes;
DROP TABLE IF EXISTS departements;

-- Table des départements
CREATE TABLE departements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

-- Table des employés
CREATE TABLE employes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    poste VARCHAR(100),
    salaire DECIMAL(10, 2),
    id_departement INT, FOREIGN KEY REFERENCES departements(id)
);

-- Table des projets
CREATE TABLE projets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    budget DECIMAL(12, 2)
);

-- Table de liaison employés <-> projets
CREATE TABLE employes_projets (
    id_employe INT, FOREIGN KEY REFERENCES employes(id),
    id_projet INT, FOREIGN KEY REFERENCES projets(id),
    PRIMARY KEY (id_employe, id_projet)
);

-- Insertion des départements
INSERT INTO departements (nom) VALUES
('Informatique'),
('Ressources Humaines'),
('Marketing'),
('Comptabilité'),
('Logistique');

-- Insertion des employés
INSERT INTO employes (nom, prenom, poste, salaire, id_departement) VALUES
('Dupont', 'Alice', 'Développeuse', 42000, 1),
('Martin', 'Jean', 'Chef de projet', 52000, 1),
('Durand', 'Sophie', 'RH', 39000, 2),
('Petit', 'Luc', 'Comptable', 41000, 4),
('Moreau', 'Emma', 'Assistante marketing', 37000, 3),
('Lemoine', 'Pierre', 'Responsable logistique', 45000, 5),
('Robert', 'Julie', 'Data analyst', 43000, 1),
('Garcia', 'Thomas', 'Stagiaire RH', 20000, 2),
('Bernard', 'Nina', 'Chargée de communication', 40000, 3),
('Marchand', 'Louis', 'Magasinier', 30000, 5);

-- Insertion des projets
INSERT INTO projets (nom, budget) VALUES
('Migration système', 150000),
('Campagne pub 2024', 80000),
('Audit interne', 50000),
('Optimisation logistique', 100000);

-- Liaisons employés-projets
INSERT INTO employes_projets (id_employe, id_projet) VALUES
(1, 1),
(2, 1),
(7, 1),
(3, 2),
(5, 2),
(9, 2),
(4, 3),
(8, 3),
(6, 4),
(10, 4);
