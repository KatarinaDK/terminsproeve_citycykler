const db = require('../config/database').connect();

const CykelType = () => { };

// ::INFO - READ - HENTER ALLE TYPER (BRUGES PÅ SIDEN SITE/CYKLER + MENU DROPDOWN)
CykelType.getAll = () => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                cykeltype.id AS id,
                cykeltype.navn AS navn,
                cykeltype.url AS url
            FROM cykeltype
            `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};

module.exports = CykelType;
