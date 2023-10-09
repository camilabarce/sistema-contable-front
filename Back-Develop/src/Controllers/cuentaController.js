// Importamos los controladores
const inicio = require('./inicioAplicacion');
const mostrarCuentas = require('./mostrarCuentasController');
const modificarCuenta = require('./modificarCuentaController');
const agregarCuenta = require('./agregarCuentaController');
const borrarCuenta = require('./borrarCuentaController');
const mostrarAsientos = require('./mostrarAsientosController');
const cuentasSelectAsiento = require('./llenarSelectAsientosController');
const insertarAsiento = require('./insertarAsientoController');

// Controlador general (orquestador)
const cuentaController = {
  inicio,
  mostrarCuentas,
  modificarCuenta,
  agregarCuenta,
  borrarCuenta,
  mostrarAsientos,
  cuentasSelectAsiento,
  insertarAsiento
};

// El 'orquestador' es un mediador entre los controladores y nuestro 'app.js'.

module.exports = cuentaController; // Exportamos el orquestador.


