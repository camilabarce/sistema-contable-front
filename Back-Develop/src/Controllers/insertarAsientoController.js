const conexion = require('../Database/conexion');

//Controlador para insertar asientos en el libro diario.
const insertarAsiento = (req, res) => {
    const {cuentaOption} = req.params;

    //Acá hago una lista de los parámetros tomando como separador a la coma y luego convierto cada String a un Number
    const listaDeParametros = cuentaOption.split(',').map(Number);

    //Este SP inserta un ID en la tabla 'asiento' y la fecha actual
      conexion.query('CALL insertarAsiento()', (error, results) => {
        if (error) throw error;
      });

    //Acá itero sobre la lista de parámetros y hago recurrentes llamadas al SP para pasarle los ID de las cuentas
    //Es para agregar muchas cuentas a un mismo id_asiento (ID que fue cargado en el SP anterior)
      for (idCuentas of listaDeParametros){
          conexion.query('CALL insertarCuentasEnAsiento(?)', [idCuentas], (error, results) => {
            if (error) throw error;        
        });
    }
    console.log("Cuentas agregadas al asiento: ", cuentaOption);
    res.json({cuentaOption});
  };
  
  module.exports = insertarAsiento; // Exportamos el controlador
  