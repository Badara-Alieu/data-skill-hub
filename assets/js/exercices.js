// =======================================================================
// Script pour la page exercices - Gestion de l'affichage et de la validation
// =======================================================================

document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------------------
    // Gérer l'affichage des blocs par catégorie (SQL, Excel)
    // --------------------------------------------------
    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const blocId = btn.getAttribute("aria-controls");
            const bloc = document.getElementById(blocId);
            const isVisible = btn.getAttribute("aria-expanded") === "true";

            btn.setAttribute("aria-expanded", !isVisible);
            bloc.hidden = isVisible;
        });
    });

    // --------------------------------------------------
    // Autoriser la touche TAB dans les <textarea>
    // --------------------------------------------------
    document.querySelectorAll("textarea").forEach((textarea) => {
        textarea.addEventListener("keydown", function (e) {
            if (e.key === "Tab") {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 4;
            }
        });
    });

    // --------------------------------------------------
    // Réponses correctes à comparer (SQL, Excel)
    // --------------------------------------------------
    const bonnesReponses = {
        // Exercices de exercices.html
        ////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////
        "tutoriels_intro_sql-1": [
            "select * from produits;"
        ],
        "tutoriels_intro_sql-2": [
            "select nom from produits;"
        ],
        
        ////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////
        "exo_sql-1": [
            "select prenom, pays, email from utilisateurs;"
        ],
        "exo_sql-2": [
            "select prenom, dateinscription from utilisateurs;"
        ],
        "exo_sql-3": [
            "select * from utilisateurs where pays like 'ma%';"
        ],
        "exo_sql-4": [
            "drop table utilisateurs;",
            "drop table if exists utilisateurs;"
        ],

        // Exercices de sql_intro.html
        "intro_sql-1": [
            "select * from utilisateurs;"
        ],
        "intro_sql-2": [
            "select prenom from utilisateurs;"
        ],

        // Exercices de sql_select.html
        "select_sql-1": [
            "select * from utilisateurs;"
        ],
        "select_sql-2": [
            "select prenom, email from utilisateurs;"
        ],
        "select_sql-3": [
            "select * from utilisateurs where age > 30;"
        ],

        // Exercices de sql_jointures.html
        "join_sql-1": [
            "select utilisateurs.prenom, commandes.montant from utilisateurs inner join commandes on utilisateurs.id = commandes.utilisateur_id;",
            "select u.prenom, c.montant from utilisateurs u join commandes c on u.id = c.utilisateur_id;"
        ],
        "join_sql-2": [
            "select * from utilisateurs left join commandes on utilisateurs.id_utilisateur = commandes.id_utilisateur;",
            "select * from utilisateurs u left join commandes c on u.id_utilisateur = c.id_utilisateur;"
        ],
        "join_sql-3": [
            "select utilisateurs.nom, produits.nom from utilisateurs inner join commandes on utilisateurs.id_utilisateur = commandes.id_utilisateur inner join produits on commandes.id_produit = produits.id_produit;",
            "select u.nom, p.nom from utilisateurs u inner join commandes c on u.id_utilisateur = c.id_utilisateur inner join produits p on c.id_produit = p.id_produit;",
            "select utilisateurs.nom, produits.nom from utilisateurs join commandes on utilisateurs.id_utilisateur = commandes.id_utilisateur join produits on commandes.id_produit = produits.id_produit;",
            "select u.nom, p.nom from utilisateurs u join commandes c on u.id_utilisateur = c.id_utilisateur join produits p on c.id_produit = p.id_produit;"
        ],

        // Exercices de excel
        "excel-1": [
            "=somme(a1:a5)",
            "=sum(a1:a5)"
        ]
    };

    // --------------------------------------------------
    // Fonction pour normaliser les réponses
    // --------------------------------------------------
    function normaliserTexte(texte, type = "sql") {
        let cleaned = texte.trim().toLowerCase();

        if (type === "sql") {
            return cleaned
                .replace(/\s+/g, " ")
                .replace(/;\s*$/, ";")
                .trim();
        }

        if (type === "excel") {
            return cleaned
                .replace(/\s*=\s*/g, "=")
                .replace(/\s*\s*/g, "(")
                .replace(/\s*\s*/g, ")")
                .replace(/\s*:\s*/g, ":")
                .replace(/\s+/g, " ")
                .trim();
        }

        return cleaned;
    }

    // --------------------------------------------------
    // Validation des réponses et affichage des feedbacks
    // --------------------------------------------------
    const validerBtns = document.querySelectorAll(".valider-btn");

    validerBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const type = btn.dataset.type;
            const champ = document.getElementById(`reponse-${id}`);
            const message = document.getElementById(`message-${id}`);
            const key = `${id}`;

            const reponse = champ.value.trim();
            if (reponse === "") {
                message.textContent = "Veuillez entrer une réponse avant de valider.";
                message.style.color = "orange";
                return;
            }

            const utilisateur = normaliserTexte(reponse, type);
            const reponsesAttendues = bonnesReponses[key].map(r => normaliserTexte(r, type));
            const estCorrect = reponsesAttendues.includes(utilisateur);

            if (estCorrect) {
                message.textContent = "Bonne réponse !";
                message.style.color = "green";

                const exerciceActuel = champ.closest(".exercice");
                const suivant = exerciceActuel.nextElementSibling;

                if (suivant && suivant.classList.contains("exercice")) {
                    setTimeout(() => {
                        suivant.style.display = "block";
                        suivant.style.opacity = 0;
                        suivant.style.transform = "translateY(30px)";
                        suivant.scrollIntoView({ behavior: "smooth", block: "start" });

                        setTimeout(() => {
                            suivant.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
                            suivant.style.opacity = 1;
                            suivant.style.transform = "translateY(0)";
                        }, 100);
                    }, 600);
                } else {
                    const finMessage = document.createElement("p");
                    finMessage.textContent = "Félicitations ! Vous avez terminé tous les exercices.";
                    finMessage.style.color = "blue";
                    finMessage.style.marginTop = "20px";
                    exerciceActuel.parentElement.appendChild(finMessage);
                }
            } else {
                message.textContent = "Réponse incorrecte. Essayez encore.";
                message.style.color = "red";
            }
        });
    });
});
