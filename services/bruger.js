const db = require('../config/database').connect();
const Hash = require('./hash');

const Bruger = () => { };

// ::INFO: READ - HENTER ALLE BRUGERE FRA DB OG TÆLLER HVOR MANGE DER ER (BRUGES PÅ SIDEN ADMIN/INDEX)
Bruger.getAll_brugerAntal = () => {
    return new Promise((resolve, reject) => {
        var sql = `
                SELECT COUNT(bruger.id) AS antal
                FROM bruger
                WHERE bruger.aktiv = 1
            `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};

// ::INFO: VALIDATE - TJEKKER OM BRUGERNAVN OG PASSWORD ER KORREKT (BRUGES PÅ SIDEN LOGIN)
Bruger.validateLogin = (brugernavn, password) => {
    return new Promise((resolve, reject) => {

        var sql = `
            SELECT 
            bruger.id, 
            bruger.password 
            FROM bruger 
            WHERE bruger.navn = ?
        `;

        db.query(sql, [ brugernavn ], async (err, result) => {

            if (err) resolve({ status: false, besked: "Teknisk MySQL fejl", fejl: err });

            if (result[ 0 ] === undefined) {
                resolve({ status: false, besked: "Brugeren ikke fundet" });
            }
            else {
                if (await Hash.compare(password, result[ 0 ].password)) {
                    resolve({ status: true, besked: "", userId: result[ 0 ].id });
                } else {
                    // reject('invalid password');
                    resolve({ status: false, besked: "Forkert kodeord" });
                }
            }
        });
    });
};

module.exports = Bruger;