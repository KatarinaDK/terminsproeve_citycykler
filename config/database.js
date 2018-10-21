// ::INFO - FORBINDELSE TIL DATABASEN
// Her skabes forbindelse til databasen vha. mysql
const mysql = require('mysql2');

module.exports = {
	'connect': () => mysql.createConnection({
		'host': 'localhost',
		'user': 'root',
		'password': '',
		'database': 'terminsproeve_citycykler'
	})
};