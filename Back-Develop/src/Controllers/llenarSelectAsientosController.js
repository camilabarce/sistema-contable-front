const conexion = require('../Database/conexion');
const SelectAsientoCuenta = require('../Models/modeloSelectAsientoCuenta');

//Controlador para mostrar las cuentas en la tabla HTML
const cuentasSelectAsiento = (req, res) => {

    //Obtenemos los datos de las cuentas desde la base de datos utilizando el stored procedure
    conexion.query('CALL llenarSelectAsientos()', (error, results) => {
        if (error) throw error;
      
        const cuentas = results[0].map((data) => {
          return new SelectAsientoCuenta(data.id_cuenta, data.nombre); //Instanciamos el objeto ubicado en 'src/Models/modeloSelectAsientoCuenta.js'
        });

        //Para ver por consola
        console.log("\nCuentas que se verán en la tabla: ", cuentas); 

        res.json(cuentas); //Enviamos las cuentas como respuesta en formato JSON

      });
  };
  
  module.exports = cuentasSelectAsiento; // Exportamos el controlador
  