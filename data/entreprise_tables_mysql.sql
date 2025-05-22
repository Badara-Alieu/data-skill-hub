
-- Création de la table departements
CREATE TABLE IF NOT EXISTS departements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

-- Création de la table projets
CREATE TABLE IF NOT EXISTS projets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    budget DECIMAL(12, 2) NOT NULL
);

-- Table d'association entre employés et projets (N:N)
CREATE TABLE IF NOT EXISTS employes_projets (
    id_employe INT,
    id_projet INT,
    PRIMARY KEY (id_employe, id_projet),
    FOREIGN KEY (id_employe) REFERENCES employes(id),
    FOREIGN KEY (id_projet) REFERENCES projets(id)
);

-- Insertion de quelques départements
INSERT INTO departements (nom) VALUES
('Informatique'),
('Ressources Humaines'),
('Marketing'),
('Finance'),
('Production');

-- Insertion de quelques projets
INSERT INTO projets (nom, budget) VALUES
('Projet Alpha', 50000.00),
('Projet Bêta', 75000.00),
('Projet Gamma', 120000.00),
('Projet Delta', 30000.00),
('Projet Épsilon', 95000.00);
