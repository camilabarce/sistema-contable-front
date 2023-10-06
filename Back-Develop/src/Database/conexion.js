const mysql = require('mysql');

const nombreDeLaBase  = 'sistcontable';

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: nombreDeLaBase
});

conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log(`Conexion exitosa a la base de datos: "${nombreDeLaBase}"`);
    }
});

module.exports = conexion;
