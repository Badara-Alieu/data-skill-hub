let db;

initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}` }).then(SQL => {
    fetch("data_skill_hub.sqlite")
        .then(res => res.arrayBuffer())
        .then(buffer => {
            db = new SQL.Database(new Uint8Array(buffer));
        });
});

function executerSQL() {
    const input = document.getElementById("sql-input").value.trim();
    const resultatDiv = document.getElementById("resultat");
    const errorDiv = document.getElementById("error");
    resultatDiv.innerHTML = "";
    errorDiv.textContent = "";

    try {
        const res = db.exec(input);
        if (res.length === 0) {
            resultatDiv.textContent = "La requête a été exécutée avec succès (aucun résultat).";
            return;
        }

        const table = document.createElement("table");
        const header = table.insertRow();
        res[0].columns.forEach(col => {
            const th = document.createElement("th");
            th.textContent = col;
            header.appendChild(th);
        });

        res[0].values.forEach(row => {
            const tr = table.insertRow();
            row.forEach(cell => {
                const td = tr.insertCell();
                td.textContent = cell;
            });
        });

        resultatDiv.appendChild(table);
    } catch (e) {
        errorDiv.textContent = "Erreur SQL : " + e.message;
    }
}
