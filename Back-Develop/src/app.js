// Configuramos nuestro servidor
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const path = require('path'); // Para concatenar ruta del index.html
const rutas = require('./Routes/rutasParaApi'); //Traemos las rutas desde el archivo


//Seteado del puerto
app.set('port', process.env.PORT || 3000); // Asignamos un puerto desde un '.env' o puerto 3000 por defecto.
const port = app.get('port');


// Middlewares (Servicios intermedios)
app.use(cors()); //Permite comunicar a nuestro servidor (http://localhost:3000) con Angular (http://localhost:4200)
app.use(morgan("dev")); //Genera los status y tiempo de respuesta por consola cuando detecta eventos en la página.
app.use(express.json()); //Para interpretar el formato JSON automáticamente (Evitamos especificar el Content-Type="text/json").
app.use(express.static(path.join(__dirname)));// Establecemos la carpeta estática para servir el archivo 'index.html'


// Servimos las rutas
app.use('/', rutas);


// Iniciamos el servidor
app.listen(port, ()=>{
    console.log('Server conectado en puerto:', port);
});

module.exports = app;

