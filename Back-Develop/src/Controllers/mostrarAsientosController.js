const conexion = require('../Database/conexion');
const Asiento = require('../Models/modeloAsiento');

const mostrarAsientos = (req, res) => {
    conexion.query('CALL mostrarAsiento()', (error, results) => {
        if (error) throw error;
        
        const asientos = results[0].map((data) => {
          return new Asiento(data.id_asiento, data.fecha_asiento, data.codigo, data.cuenta, data.importe); //Instanciamos el objeto ubicado en 'src/Models/modeloAsiento.js'
        });

        //Para ver por consola
        console.log("\nAsientos que se verán en la tabla: ", asientos); 

        res.json(asientos); //Enviamos los asientos como respuesta en formato JSON

      });
  };
  
  module.exports = mostrarAsientos; // Exportamos el controlador
  