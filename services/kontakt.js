const db = require('../config/database').connect();

const Kontakt = () => { };

// ::INFO - READ - HENTER ALLE KONTAKTOPLYSNINGERNE (BRUGES PÅ SIDEN SITE/KONTAKT, SAMT I FOOTEREN)
Kontakt.getOne = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                kontakt.id AS id,
                kontakt.firmanavn AS firmanavn,
                kontakt.vejnavn AS vejnavn,
                kontakt.husnummer AS husnummer,
                kontakt.postnummer AS postnummer,
                kontakt.bynavn AS bynavn,
                kontakt.telefon AS telefon,
                kontakt.fax AS fax,
                kontakt.email AS email
            FROM kontakt
            WHERE id = ?
        `;
        db.query(sql, [ id ], (err, result) => {
            // console.log(err);
            if (err) reject(err)
            resolve(result[0]);
        });
    });
};


// ::INFO: UPDATE - OPDATERER EN SIDEOG INDSÆTTER I DB (BRUGES PÅ SIDEN ADMIN/SIDE_RET)
Kontakt.updateOne = (id, firmanavn, vejnavn, husnummer, postnummer, bynavn, telefon, fax, email) => {
    return new Promise(async (resolve, reject) => {

        var prepareStatement = [ firmanavn, vejnavn, husnummer, postnummer, bynavn, telefon, fax, email, id ];

        var sql = `
        UPDATE kontakt
        SET
            kontakt.firmanavn = ?,
            kontakt.vejnavn = ?,
            kontakt.husnummer = ?,
            kontakt.postnummer = ?,
            kontakt.bynavn = ?,
            kontakt.telefon = ?,
            kontakt.fax = ?,
            kontakt.email = ?
        WHERE kontakt.id = ?
    `;
        // console.log(sql);
        db.query(sql, prepareStatement, (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        });
    });
};

module.exports = Kontakt;