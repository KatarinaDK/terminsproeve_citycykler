const db = require('../config/database').connect();

const CykelFarve = () => { };

// ::INFO - READ - HENTER ALLE CYKLER AF EN BESTEMT TYPE (BRUGES PÅ SIDEN SITE/CYKLER)
CykelFarve.getAll = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
        SELECT
            cykelfarve.id AS id,
            cykel.id AS cykelId,
            cykel.aktiv AS aktiv,
            farve.navn AS navn,
            farve.url AS url
        FROM cykelfarve
        INNER JOIN cykel ON cykelfarve.fk_cykel = cykel.id
        INNER JOIN farve ON cykelfarve.fk_farve = farve.id
        WHERE cykel.aktiv = 1 AND cykel.id = ?
        `;
        db.query(sql, [ id ], (err, result) => {
            console.log(err);
            if (err) reject(err)
            resolve(result);
        });
    });
};

// ::INFO - READ - HENTER ALLE CYKLER AF EN BESTEMT TYPE (BRUGES PÅ SIDEN SITE/CYKLER)
CykelFarve.getAll_navn = () => {
    return new Promise((resolve, reject) => {
        var sql = `
        SELECT
            farve.id AS id,
            farve.navn AS navn,
            farve.url AS url
        FROM farve
        `;
        db.query(sql, (err, result) => {
            console.log(err);
            if (err) reject(err)
            resolve(result);
        });
    });
};

CykelFarve.delete = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
                DELETE FROM cykelfarve 
                WHERE FK_cykel = ?              
            `;
        db.query(sql, [ id ], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = CykelFarve;