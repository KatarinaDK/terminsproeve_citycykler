const db = require('../config/database').connect();

const Udstyr = () => { };

// ::INFO: CREATE - OPRETTER ET STYKKE UDSTYR OG INDSÆTTER I DB (BRUGES PÅ SIDEN ADMIN/UDSTYR_OPRET)
Udstyr.createOne = (model, beskrivelse, producentnavn, udstyrskategorinavn, udstyrsbillede, pris) => {
    // console.log(kategoriId);
    return new Promise(async (resolve, reject) => {

        var prepareStatement = [ model, beskrivelse, producentnavn, udstyrskategorinavn, udstyrsbillede, pris ];

        var sql = `
        INSERT INTO udstyr
        SET
            udstyr.model = ?,
            udstyr.beskrivelse = ?,
            udstyr.fk_producent = ?,
            udstyr.fk_kategori = ?,
            udstyr.url = ?,
            udstyr.pris = ?
        `;

        db.query(sql, prepareStatement, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// ::INFO: READ - HENTER ET STYKKE UDSTYR (BRUGES PÅ SIDEN SITE/UDSTYRET)
Udstyr.getOne = (id) => {
    return new Promise((resolve, reject) => {

        var sql = `
        SELECT
            udstyr.id AS id,
            udstyr.model AS model,
            udstyr.beskrivelse AS beskrivelse,
            producent.navn AS producentnavn,
            udstyrskategori.navn AS kategorinavn,
            udstyr.url AS url,
            udstyr.pris AS pris,
            udstyr.aktiv AS aktiv
        FROM udstyr
        INNER JOIN producent ON udstyr.fk_producent = producent.id
        INNER JOIN udstyrskategori ON udstyr.fk_kategori = udstyrskategori.id
        WHERE udstyr.aktiv = 1 AND udstyr.id = ?
        `;
        db.query(sql, [ id ], (err, result) => {
            if (err) reject(err)
            resolve(result[0]);
        });
    });
};

// ::INFO: READ - HENTER MODELNAVNET FRA DB OG SAMMENLIGNER MED DET INDTASTET NAVN I FORMULAREN OM DE ER ENS (BRUGES PÅ SIDEN ADMIN/UDSTYR_OPRET + ADMIN/UDSTYR_RET + ADMIN/UDSTYR_OVERSIGT)
Udstyr.getAll_udstyrsmodelAntal = (udstyrsmodelnavn) => {
    return new Promise((resolve, reject) => {
        var sql = `
                SELECT COUNT(udstyr.model) AS antal
                FROM udstyr
                WHERE udstyr.model = ?
            `;
        db.query(sql, [ udstyrsmodelnavn ], (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};

// ::INFO: READ - HENTER ALT UDSTYR FRA DB OG TÆLLER HVOR MANGE DER ER (BRUGES PÅ SIDEN ADMIN/INDEX)
Udstyr.getAll_udstyrAntal = () => {
    return new Promise((resolve, reject) => {
        var sql = `
                SELECT COUNT(udstyr.id) AS antal
                FROM udstyr
                WHERE udstyr.aktiv = 1
            `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};


// ::INFO - READ - HENTER ALT UDSTYR AF EN BESTEMT KATEGORI (BRUGES PÅ SIDEN SITE/UDSTYR)
Udstyr.getAll_kategori = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
        SELECT
            udstyr.id AS id,
            udstyr.model AS model,
            udstyr.beskrivelse AS beskrivelse,
            producent.navn AS producentnavn,
            udstyrskategori.navn AS kategorinavn,
            udstyr.url AS url,
            udstyr.pris AS pris,
            udstyr.aktiv AS aktiv
        FROM udstyr
        INNER JOIN producent ON udstyr.fk_producent = producent.id
        INNER JOIN udstyrskategori ON udstyr.fk_kategori = udstyrskategori.id
        WHERE udstyr.aktiv = 1 AND udstyrskategori.id = ?
        `;
        db.query(sql, [ id ], (err, result) => {
            console.log(err);
            if (err) reject(err)
            resolve(result);
        });
    });
};

// ::INFO - READ - HENTER ALT UDSTYR (BRUGES PÅ SIDERNE ADMIN/UDSTYR_OVERSIGT)
Udstyr.getAll_aktiveret = () => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                udstyr.id AS id,
                udstyr.model AS model,
                producent.navn AS producent,
                udstyr.url AS url,
                udstyr.aktiv AS aktiv
            FROM udstyr
            INNER JOIN producent ON udstyr.fk_producent = producent.id
            WHERE udstyr.aktiv = 1
        `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};

// ::INFO - READ - HENTER ALT ARKIVERET UDSTYR (BRUGES PÅ SIDEN ADMIN/UDSTYR_AKTIVER)
Udstyr.getAll_arkiveret = () => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                udstyr.id AS id,
                udstyr.model AS model,
                producent.navn AS producent,
                udstyr.url AS url,
                udstyr.aktiv AS aktiv
            FROM udstyr
            INNER JOIN producent ON udstyr.fk_producent = producent.id
            WHERE udstyr.aktiv = 0
        `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};

// ::INFO: UPDATE - OPDATERER ET STYKKE UDSTYR OG INDSÆTTER I DB (BRUGES PÅ SIDEN ADMIN/UDSTYR_RET)
Udstyr.updateOne = (id, model, beskrivelse, producentnavn, udstyrskategorinavn, udstyrsbillede, pris) => {

    return new Promise(async (resolve, reject) => {

        var prepareStatement = [ model, beskrivelse, producentnavn, udstyrskategorinavn, udstyrsbillede, pris, id ];

        var sql = `
        UPDATE udstyr
        SET
            udstyr.model = ?,
            udstyr.beskrivelse = ?,
            udstyr.fk_producent = ?,
            udstyr.fk_kategori = ?,
            udstyr.url = ?,
            udstyr.pris = ?
        WHERE udstyr.id = ?
        `;

        if (udstyrsbillede == "") {
            prepareStatement = [ model, beskrivelse, producentnavn, udstyrskategorinavn, pris, id ];
            var sql = `
            UPDATE udstyr
            SET
                udstyr.model = ?,
                udstyr.beskrivelse = ?,
                udstyr.fk_producent = ?,
                udstyr.fk_kategori = ?,
                udstyr.pris = ?
            WHERE udstyr.id = ?
            `;
        }

console.log(prepareStatement);

        // console.log(sql);
        db.query(sql, prepareStatement, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};

// ::INFO: UPDATE - AKTIVERER ET STYKKE UDSTYR OG INDSÆTTER I DB (BRUGES PÅ SIDEN ADMIN/UDSTYR_AKTIVER)
Udstyr.updateOne_aktiver = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
                UPDATE udstyr SET 
                    udstyr.aktiv = 1 
                WHERE udstyr.id = ?              
            `;
        db.query(sql, [ id ], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// ::INFO: UPDATE - ARKIVERER ET STYKKE UDSTYR OG INDSÆTTER I DB (BRUGES PÅ SIDEN ADMIN/UDSTYR_OVERSIGT)
Udstyr.updateOne_arkiver = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
                UPDATE udstyr SET 
                    udstyr.aktiv = 0 
                WHERE udstyr.id = ?              
            `;
        db.query(sql, [ id ], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

// ::INFO: DELETE - SLETTER ET STYKKE UDSTYR (BRUGES PÅ SIDEN ADMIN/UDSTYR_OVERSIGT)
Udstyr.deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
                DELETE FROM udstyr 
                WHERE udstyr.id = ?              
            `;
        db.query(sql, [ id ], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = Udstyr;