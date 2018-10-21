const db = require('../config/database').connect();

const UdstyrsKategori = () => { };

// ::INFO - READ - HENTER ALLE TYPER (BRUGES PÅ SIDEN SITE/CYKLER + MENU DROPDOWN)
UdstyrsKategori.getAll = () => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                udstyrskategori.id AS id,
                udstyrskategori.navn AS navn,
                udstyrskategori.url AS url
            FROM udstyrskategori
            `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};

module.exports = UdstyrsKategori;
