const db = require('../config/database').connect();

const Cykel = () => { };

// ::INFO: CREATE - OPRETTER ET PRODUKT OG INDSÆTTER I DB (BRUGES PÅ SIDEN ADMIN/PRODUKT_OPRET)
Cykel.createOne = (model, beskrivelse, producentnavn, cykeltypenavn, cykelbillede, pris, tilbudspris) => {
    // console.log(kategoriId);
    return new Promise(async (resolve, reject) => {

        var prepareStatement = [ model, beskrivelse, producentnavn, cykeltypenavn, cykelbillede, pris, tilbudspris ];

        var sql = `
        INSERT INTO cykel
        SET
            cykel.model = ?,
            cykel.beskrivelse = ?,
            cykel.fk_producent = ?,
            cykel.fk_type = ?,
            cykel.url = ?,
            cykel.dato = NOW(),
            cykel.pris = ?,
            cykel.tilbudspris = ?
        `;

        if (tilbudspris == 0) {
            prepareStatement = [ model, beskrivelse, producentnavn, cykeltypenavn, cykelbillede, pris ];
            var sql = `
            INSERT INTO cykel
            SET
                cykel.model = ?,
                cykel.beskrivelse = ?,
                cykel.fk_producent = ?,
                cykel.fk_type = ?,
                cykel.url = ?,
                cykel.dato = NOW(),
                cykel.pris = ?
            `;
        }

        db.query(sql, prepareStatement, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// ::INFO: READ - HENTER EN CYKEL (BRUGES PÅ SIDEN SITE/CYKEL)
Cykel.getOne = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                cykel.id AS id,
                cykel.model AS model,
                cykel.beskrivelse AS beskrivelse,
                producent.navn AS producentnavn,
                cykeltype.navn AS typenavn,
                cykel.url AS url,
                cykel.pris AS pris,
                cykel.tilbudspris AS tilbudspris,
                cykel.aktiv AS aktiv
            FROM cykel
            INNER JOIN producent ON cykel.fk_producent = producent.id
            INNER JOIN cykeltype ON cykel.fk_type = cykeltype.id
            WHERE cykel.aktiv = 1 AND cykel.id = ?
            `;
        db.query(sql, [ id ], (err, result) => {
            if (err) reject(err)
            resolve(result[ 0 ]);
        });
    });
};

// ::INFO: READ - HENTER MODELNAVNET FRA DB OG SAMMENLIGNER MED DET INDTASTET NAVN I FORMULAREN OM DE ER ENS (BRUGES PÅ SIDEN ADMIN/CYKEL_OPRET + ADMIN/CYKEL_OPRET + ADMIN/CYKEL_OVERSIGT)
Cykel.getAll_cykelmodelAntal = (cykelmodelnavn) => {
    return new Promise((resolve, reject) => {
        var sql = `
                SELECT COUNT(*) AS antal
                FROM cykel
                WHERE cykel.model = ?
            `;
        db.query(sql, [ cykelmodelnavn ], (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};

// ::INFO: READ - HENTER ALLE CYKLER FRA DB OG TÆLLER HVOR MANGE DER ER (BRUGES PÅ SIDEN ADMIN/INDEX)
Cykel.getAll_cykelAntal = () => {
    return new Promise((resolve, reject) => {
        var sql = `
                SELECT COUNT(cykel.id) AS antal
                FROM cykel
                WHERE cykel.aktiv = 1
            `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};

// ::INFO - READ - HENTER TRE CYKLER PÅ TILBUD (BRUGES PÅ ALLE SIDER I ASIDE TILBUD)
Cykel.get_tilbud = () => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                cykel.id AS id,
                cykel.model AS model,
                cykel.url AS url,
                cykel.pris AS pris,
                cykel.tilbudspris AS tilbudspris,
                cykel.aktiv AS aktiv
            FROM cykel
            WHERE cykel.tilbudspris != 0 AND cykel.aktiv = 1
            ORDER BY RAND()
            LIMIT 3
        `;
        db.query(sql, (err, result) => {

            // console.log(result);
            if (err) reject(err)
            // console.log(err);
            resolve(result);
        });
    });
};

// ::INFO - READ - HENTER DE SENESTE TO CYKLER SOM ER OPRETTET (BRUGES PÅ SIDEN SITE/NYHEDER)
Cykel.get_nyheder = () => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                cykel.id AS id,
                cykel.model AS model,
                cykel.beskrivelse AS beskrivelse,
                producent.navn AS producent,
                cykel.url AS url,
                cykel.pris AS pris,
                cykel.tilbudspris AS tilbudspris,
                DATE_FORMAT(cykel.dato, '%e/%c-%Y' ) AS dato,
                cykel.aktiv AS aktiv
                FROM cykel
                INNER JOIN producent ON cykel.fk_producent = producent.id
                WHERE cykel.aktiv = 1 
                ORDER BY dato DESC
                LIMIT 2
                `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            // console.log(err);
            resolve(result);
        });
    });
};

// ::INFO - READ - HENTER DE SENESTE 20 CYKLER SOM ER OPRETTET (BRUGES PÅ SIDEN SITE/NYHEDER)
Cykel.get_nyhederFlere = () => {
    return new Promise((resolve, reject) => {
        var sql = `
                SELECT
                cykel.id AS id,
                cykel.model AS model,
                cykel.beskrivelse AS beskrivelse,
                producent.navn AS producent,
                cykel.url AS url,
                cykel.pris AS pris,
                cykel.tilbudspris AS tilbudspris,
                DATE_FORMAT(cykel.dato, '%e/%c-%Y' ) AS dato,
                cykel.aktiv AS aktiv
            FROM cykel
            INNER JOIN producent ON cykel.fk_producent = producent.id
            WHERE cykel.aktiv = 1 
            ORDER BY dato DESC
            LIMIT 20
        `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            // console.log(err);
            resolve(result);
        });
    });
};

// ::INFO - READ - HENTER ALLE CYKLER AF EN BESTEMT TYPE (BRUGES PÅ SIDEN SITE/CYKLER)
// Cykel.getAll_type = (id) => {
//     return new Promise((resolve, reject) => {
//         var sql = `
//         SELECT
//             cykel.id AS id,
//             cykel.model AS model,
//             cykel.beskrivelse AS beskrivelse,
//             producent.navn AS producentnavn,
//             cykeltype.navn AS typenavn,
//             cykel.url AS url,
//             cykel.pris AS pris,
//             cykel.tilbudspris AS tilbudspris,
//             cykel.aktiv AS aktiv
//         FROM cykel
//         INNER JOIN producent ON cykel.fk_producent = producent.id
//         INNER JOIN cykeltype ON cykel.fk_type = cykeltype.id
//         WHERE cykel.aktiv = 1 AND cykeltype.id = ?
//         ORDER BY cykel.id
//         LIMIT 0, 2
//         `;
//         db.query(sql, [ id ], (err, result) => {
//             if (err) reject(err)
//             // console.log(err);
//             resolve(result);
//         });
//     });
// };
Cykel.getAll_type = (typenavn) => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT COUNT(*) AS antal
            FROM cykel
            WHERE FK_type = ?
        `;
        db.query(sql, [ typenavn ], (err, result) => {
            if (err) reject(err)
            // console.log(err);
            resolve(result[ 0 ].antal);
        });
    });
};

// ::INFO - READ - HENTER ALLE CYKLER AF EN BESTEMT TYPE (BRUGES PÅ SIDEN SITE/CYKLER)
Cykel.getPage_type = (typenavn, offset, limit) => {
    return new Promise((resolve, reject) => {
        var sql = `
        SELECT
            cykel.id AS id,
            cykel.model AS model,
            cykel.beskrivelse AS beskrivelse,
            producent.navn AS producentnavn,
            cykeltype.navn AS typenavn,
            cykel.url AS url,
            cykel.pris AS pris,
            cykel.tilbudspris AS tilbudspris,
            cykel.aktiv AS aktiv
        FROM cykel
        INNER JOIN producent ON cykel.fk_producent = producent.id
        INNER JOIN cykeltype ON cykel.fk_type = cykeltype.id
        WHERE cykel.aktiv = 1 AND cykeltype.id = ?
        ORDER BY cykel.id
        LIMIT ?, ?
        `;
        db.query(sql, [ typenavn, offset, limit ], (err, result) => {
            if (err) reject(err)
            // console.log(err);
            resolve(result);
        });
    });
};

// ::INFO - READ - HENTER ALLE CYKLER (BRUGES PÅ SIDERNE ADMIN/CYKEL_OVERSIGT)
Cykel.getAll_aktiveret = () => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                cykel.id AS id,
                cykel.model AS model,
                producent.navn AS producent,
                cykel.url AS url,
                cykel.tilbudspris AS tilbudspris,
                cykel.aktiv AS aktiv
            FROM cykel
            INNER JOIN producent ON cykel.fk_producent = producent.id
            WHERE cykel.aktiv = 1
        `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            // console.log(err);
            resolve(result);
        });
    });
};

// ::INFO - READ - HENTER ALLE PRODUKTER (BRUGES PÅ SIDEN ADMIN/CYKEL_AKTIVER)
Cykel.getAll_arkiveret = () => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                cykel.id AS id,
                cykel.model AS model,
                producent.navn AS producent,
                cykel.url AS url,
                cykel.tilbudspris AS tilbudspris,
                cykel.aktiv AS aktiv
            FROM cykel
            INNER JOIN producent ON cykel.fk_producent = producent.id
            WHERE cykel.aktiv = 0
        `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};

// ::INFO: UPDATE - OPDATERER EN CYKEL OG INDSÆTTER I DB (BRUGES PÅ SIDEN ADMIN/CYKEL_RET)
Cykel.updateOne = (id, model, beskrivelse, producentnavn, cykeltypenavn, cykelbillede, pris, tilbudspris) => {
    return new Promise(async (resolve, reject) => {

        var prepareStatement = [ model, beskrivelse, producentnavn, cykeltypenavn, cykelbillede, pris, tilbudspris, id ];

        var sql = `
        UPDATE cykel
        SET
            cykel.model = ?,
            cykel.beskrivelse = ?,
            cykel.fk_producent = ?,
            cykel.fk_type = ?,
            cykel.url = ?,
            cykel.pris = ?,
            cykel.tilbudspris = ?
        WHERE cykel.id = ?
        `;

        if (cykelbillede == "") {
            prepareStatement = [ model, beskrivelse, producentnavn, cykeltypenavn, pris, tilbudspris, id ];
            var sql = `
            UPDATE cykel
            SET
                cykel.model = ?,
                cykel.beskrivelse = ?,
                cykel.fk_producent = ?,
                cykel.fk_type = ?,
                cykel.pris = ?,
                cykel.tilbudspris = ?
            WHERE cykel.id = ?
            `;
        }
        // console.log(sql);
        db.query(sql, prepareStatement, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// ::INFO: UPDATE - AKTIVERER EN CYKEL OG INDSÆTTER I DB (BRUGES PÅ SIDEN ADMIN/CYKEL_AKTIVER)
Cykel.updateOne_aktiver = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
                UPDATE cykel SET 
                    cykel.aktiv = 1 
                WHERE cykel.id = ?              
            `;
        db.query(sql, [ id ], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// ::INFO: UPDATE - ARKIVERER EN CYKEL OG INDSÆTTER I DB (BRUGES PÅ SIDEN ADMIN/CYKEL_OVERSIGT)
Cykel.updateOne_arkiver = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
                UPDATE cykel SET 
                    cykel.aktiv = 0 
                WHERE cykel.id = ?              
            `;
        db.query(sql, [ id ], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// ::INFO: DELETE - SLETTER EN CYKEL (BRUGES PÅ SIDEN ADMIN/CYKEL_OVERSIGT)
Cykel.deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
                DELETE FROM cykel 
                WHERE cykel.id = ?              
            `;
        db.query(sql, [ id ], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};


// ::INFO: READ - HENTER ALLE FREMSØGTE CYKLER (BRUGES PÅ SIDEN SITE/AVANCERETFIND)
Cykel.basicFind = (fritekst) => {
    return new Promise((resolve, reject) => {
        var sql = `
                SELECT
                    cykel.id AS id,
                    cykel.model AS model,
                    cykel.beskrivelse AS beskrivelse,
                    cykel.url AS url,
                    cykel.pris AS pris,
                    cykel.tilbudspris AS tilbudspris
                FROM cykel
                WHERE cykel.model LIKE '%${fritekst}%' AND cykel.aktiv = 1 
                ORDER BY cykel.model ASC
                `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};

// ::INFO: READ - HENTER ALLE FREMSØGTE CYKLER (BRUGES PÅ SIDEN SITE/AVANCERETFIND)
Cykel.avanceretFind = (type, producent, pris, fritekst) => {
    return new Promise((resolve, reject) => {
        var sql = `
                SELECT
                    cykel.id AS id,
                    cykel.model AS model,
                    cykel.beskrivelse AS beskrivelse,
                    cykel.url AS url,
                    cykel.pris AS pris,
                    cykel.tilbudspris AS tilbudspris
                FROM cykel
                WHERE 
                    cykel.FK_type LIKE '%${type}%' AND 
                    cykel.FK_producent LIKE '%${producent}%' AND 
                    ${ pris ? 'cykel.pris < ' + pris + ' AND ' : ''}
                    cykel.model LIKE '%${fritekst}%' AND 
                    cykel.aktiv = 1 
                ORDER BY cykel.model ASC
                `;
        console.log(sql);
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};

module.exports = Cykel;