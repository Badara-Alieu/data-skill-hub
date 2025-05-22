// =========================================================================
// Script pour la page des tutoriels - Affiche les listes par catégorie
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".category-btn");

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("aria-controls");
            const list = document.getElementById(targetId);
            const isExpanded = btn.getAttribute("aria-expanded") === "true";

            btn.setAttribute("aria-expanded", !isExpanded);
            list.hidden = isExpanded;
        });
    });
});
