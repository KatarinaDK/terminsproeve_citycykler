const db = require('../config/database').connect();

const Producent = () => { };

// ::INFO - READ - HENTER ALLE TYPER (BRUGES PÅ SIDEN SITE/CYKLER + MENU DROPDOWN)
Producent.getAll = () => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                producent.id AS id,
                producent.navn AS navn
            FROM producent
            `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};

module.exports = Producent;
