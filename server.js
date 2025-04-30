// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sert les fichiers statiques (HTML, CSS, JS...)
app.use(express.static(__dirname));

// Route de test
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Route de traitement du formulaire
app.post("/envoyer-contact", (req, res) => {
    const { nom, email, message } = req.body;
    console.log("Formulaire reçu :", { nom, email, message });

    // Tu peux ajouter ici une logique pour enregistrer ou envoyer le message

    res.status(200).json({ success: true, message: "Message bien reçu !" });
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
