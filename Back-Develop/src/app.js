// Configuramos nuestro servidor
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const path = require('path'); // Para concatenar ruta del index.html
const cuentaController = require('./Controllers/cuentaController'); // Orquestador.

// Configuraciones
app.set('port', process.env.PORT || 3000); // Asignamos un puerto disponible por defecto o puerto 3000.
const port = app.get('port');

// Middlewares (Servicios intermedios)
app.use(cors()); //Permite comunicar a nuestro servidor (http://localhost:3000) con Angular (http://localhost:4200)
app.use(morgan("dev")); //Genera los status y tiempo de respuesta por consola cuando detecta eventos en la página.
app.use(express.json()); //Para interpretar el formato JSON automáticamente (Evitamos especificar el Content-Type="text/json").

// Rutas (URL´s)
app.get('/', cuentaController.inicio); // Carga de página principal (index.html)
app.get('/mostrarCuentas/:grupoOption/:bloqueOption/:rubroOption', cuentaController.mostrarCuentas); 
app.post('/modificarCuenta/:nuevoNombre/:codigoCuenta/:nombreActual', cuentaController.modificarCuenta);
app.post('/agregarCuenta/:grupoOption/:bloqueOption/:rubroOption/:nuevaCuenta', cuentaController.agregarCuenta);
app.delete('/borrarCuenta/:codigoCuenta',cuentaController.borrarCuenta);
app.get('/mostrarAsientos', cuentaController.mostrarAsientos);
app.get('/llenarSelectAsientos', cuentaController.cuentasSelectAsiento);
app.post('/insertarAsiento', cuentaController.insertarAsiento);
    
// Establecemos la carpeta estática para servir el archivo 'index.html'
app.use(express.static(path.join(__dirname)));

// Iniciamos el servidor
app.listen(port, ()=>{
    console.log('Server conectado en puerto:', port);
});

module.exports = app;

