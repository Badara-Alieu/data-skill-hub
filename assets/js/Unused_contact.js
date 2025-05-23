// contact.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const messageBox = document.getElementById("form-message");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nom = document.getElementById("nom").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        try {
            const response = await fetch("/envoyer-contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nom, email, message })
            });

            const data = await response.json();

            if (data.success) {
                messageBox.textContent = data.message;
                messageBox.style.color = "green";
                form.reset();
            } else {
                messageBox.textContent = "Erreur lors de l'envoi.";
                messageBox.style.color = "red";
            }
        } catch (error) {
            messageBox.textContent = "Erreur réseau.";
            messageBox.style.color = "red";
        }
    });
});
