const db = require('../config/database').connect();

const Side = () => { };

// ::INFO - READ - HENTER ALLE SIDER (BRUGES PÅ SIDEN ADMIN/SIDE_OVERSIGT)
Side.getAll = () => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                side.id AS id,
                side.navn AS navn,
                side.afsnit1 AS afsnit1,
                side.afsnit2 AS afsnit2,
                side.afsnit3 AS afsnit3,
                side.afsnit4 AS afsnit4,
                side.afsnit5 AS afsnit5,
                side.url AS url
            FROM side
            `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};

// ::INFO: READ - HENTER EN SIDE (BRUGES PÅ SIDEN SITE/FORSIDE)
Side.getOne = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                side.id AS id,
                side.navn AS navn,
                side.afsnit1 AS afsnit1,
                side.afsnit2 AS afsnit2,
                side.afsnit3 AS afsnit3,
                side.afsnit4 AS afsnit4,
                side.afsnit5 AS afsnit5,
                side.url AS url
            FROM side
            WHERE side.id = ?
        `;
        db.query(sql, [ id ], (err, result) => {
            if (err) reject(err)
            resolve(result[0]);
        });
    });
};
// Side.getOne = (id) => {
//     return new Promise((resolve, reject) => {
//         var sql = `
//             SELECT
//                 side_test.id AS id,
//                 side_test.navn AS navn,
//                 side_test.afsnit AS afsnit,
//                 side_test.url AS url
//             FROM side_test
//             WHERE side_test.id = ?
//         `;
//         db.query(sql, [ id ], (err, result) => {
//             if (err) reject(err)
//             resolve(result);
//         });
//     });
// };

// ::INFO: UPDATE - OPDATERER EN SIDEOG INDSÆTTER I DB (BRUGES PÅ SIDEN ADMIN/SIDE_RET)
Side.updateOne = (id, afsnit, forsidebillede) => {
    return new Promise(async (resolve, reject) => {

        var prepareStatement = [ afsnit, forsidebillede, id ];
        var sql = `
            UPDATE side_test
            SET
                side_test.afsnit = ?,
                side_test.url = ?
            WHERE side_test.id = ?
        `;
        if (forsidebillede == "") {
            prepareStatement = [ afsnit, id  ];
            var sql = `
                UPDATE side_test
                SET
                    side_test.afsnit = ?,
                WHERE side_test.id = ?
            `;
        }
        // console.log(sql);
        db.query(sql, prepareStatement, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};
// Side.updateOne = (id, afsnit1, afsnit2, afsnit3, afsnit4, afsnit5, forsidebillede) => {
//     return new Promise(async (resolve, reject) => {

//         var prepareStatement = [ afsnit1, afsnit2, afsnit3, afsnit4, afsnit5, forsidebillede, id ];
//         var sql = `
//             UPDATE side
//             SET
//                 side.afsnit1 = ?,
//                 side.afsnit2 = ?,
//                 side.afsnit3 = ?,
//                 side.afsnit4 = ?,
//                 side.afsnit5 = ?,
//                 side.url = ?
//             WHERE side.id = ?
//         `;
//         if (forsidebillede == "") {
//             prepareStatement = [ afsnit1, afsnit2, afsnit3, afsnit4, afsnit5, id  ];
//             var sql = `
//                 UPDATE side
//                 SET
//                     side.afsnit1 = ?,
//                     side.afsnit2 = ?,
//                     side.afsnit3 = ?,
//                     side.afsnit4 = ?,
//                     side.afsnit5 = ?
//                 WHERE side.id = ?
//             `;
//         }
//         // console.log(sql);
//         db.query(sql, prepareStatement, (err, result) => {
//             if (err) {
//                 console.log(err);
//                 reject(err);
//             }
//             resolve(result);
//         });
//     });
// };

module.exports = Side;