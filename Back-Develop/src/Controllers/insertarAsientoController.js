const conexion = require('../Database/conexion');

//Controlador para insertar asientos en el libro diario.
const insertarAsiento = (req, res) => {
    const { cuentasSeleccionadas } = req.body;

    //Convierto dicha lista a un JSON para recorrerlo luego con el SP
    const parametrosJSON = JSON.stringify({ CuentasParaAsiento: cuentasSeleccionadas });

    conexion.query('CALL insertarAsiento(?)', [parametrosJSON], (error, results) => {
              if (error) throw error;        
          });

    console.log("Lista JSON: ", parametrosJSON);
    res.json({cuentasSeleccionadas});
  };
  
  module.exports = insertarAsiento; // Exportamos el controlador
  