const express = require('express');
const router = express.Router();
const orquestador = require('../Controllers/orquestador');

router
    //Ruta por defecto en 'localhost:3000' para testear el funcionamiento del server
    .get('/', orquestador.inicio) 

    //Rutas para el plan de cuentas
    .get('/mostrarCuentas/:grupoOption/:bloqueOption/:rubroOption', orquestador.mostrarCuentas)
    .post('/modificarCuenta/:nuevoNombre/:codigoCuenta/:nombreActual', orquestador.modificarCuenta)
    .post('/agregarCuenta/:grupoOption/:bloqueOption/:rubroOption/:nuevaCuenta', orquestador.agregarCuenta)
    .delete('/borrarCuenta/:codigoCuenta', orquestador.borrarCuenta)

    //Rutas para el libro diario.
    .get('/mostrarAsientos', orquestador.mostrarAsientos)
    .get('/llenarSelectAsientos', orquestador.cuentasSelectAsiento)
    .post('/insertarAsiento', orquestador.insertarAsiento);

module.exports = router;


/*Lo que se ve debajo es el seteo de las propiedades de la documentación de cada ruta*/


//DOCUMENTACIÓN PARA EL PLAN DE CUENTAS

/**
 * @openapi
 * /mostrarCuentas/{grupoOption}/{bloqueOption}/{rubroOption}:
 *   get:
 *     tags:
 *       - Plan de Cuentas
 *     description: "Muestra las cuentas según la combinación de los ID´s" 
 *     parameters:
 *       - in: path
 *         name: grupoOption
 *         schema:
 *           type: integer
 *         description: ID del grupo
 *       - in: path
 *         name: bloqueOption
 *         schema:
 *           type: integer
 *         description: ID del Bloque
 *       - in: path
 *         name: rubroOption
 *         schema:
 *           type: integer
 *         description: ID del Rubro
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             example:
 *               - codigo: "1101001"
 *                 nombre: "Caja"
 *                 tipo: "Activo corriente"
 *                 saldo: 0
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al mostrar las cuentas."
 */

/**
 * @openapi
 * /modificarCuenta/{nuevoNombre}/{codigoCuenta}/{nombreActual}:
 *   get:
 *     tags:
 *       - Plan de Cuentas
 *     description: "Cambia el nombre de una cuenta"
 *     parameters:
 *       - in: path
 *         name: nuevoNombre
 *         schema:
 *           type: string
 *         description: Nombre que se asignará a la cuenta
 *       - in: path
 *         name: codigoCuenta
 *         schema:
 *           type: integer
 *         description: Código de la cuenta
 *       - in: path
 *         name: nombreActual
 *         schema:
 *           type: string
 *         description: Nombre actual de la cuenta
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Cuenta modificada con éxito." 
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al modificar la cuenta."
 */

/**
 * @openapi
 * /agregarCuenta/{grupoOption}/{bloqueOption}/{rubroOption}/{nuevaCuenta}:
 *   post:
 *     tags:
 *       - Plan de Cuentas
 *     description: "Agrega una cuenta dependiendo de la combinación de los ID´s"
 *     parameters:
 *       - in: path
 *         name: grupoOption
 *         schema:
 *           type: integer
 *         description: ID del grupo
 *       - in: path
 *         name: bloqueOption
 *         schema:
 *           type: integer
 *         description: ID del bloque
 *       - in: path
 *         name: rubroOption
 *         schema:
 *           type: integer
 *         description: ID del rubro
 *       - in: path
 *         name: nuevaCuenta
 *         schema:
 *           type: string
 *         description: Nombre de la cuenta a agregar 
 *     responses:
 *       201:
 *         description: CREATED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Cuenta agregada con éxito." 
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al agregar la cuenta."
 */

/**
 * @openapi
 * /borrarCuenta/{codigoCuenta}:
 *   delete:
 *     tags:
 *       - Plan de Cuentas
 *     parameters:
 *       - in: path
 *         name: codigoCuenta
 *         schema:
 *           type: integer
 *         description: Código de la cuenta
 *     responses:
 *       204:
 *         description: NO CONTENT
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al borrar la cuenta."
 */



//DOCUMENTACIÓN PARA LIBRO DIARIO

/**
 * @openapi
 * /mostrarAsientos:
 *   get:
 *     tags:
 *       - Libro Diario
 *     description: "Muestra los datos del asiento tales como: N°Asiento | Fecha | Código de cuenta | Nombre de Cuenta | Importe"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             example:
 *               - id_asiento: 1
 *                 fecha_asiento: "2023-11-09"
 *                 codigo: "1101001"
 *                 cuenta: "Caja"
 *                 importe: 10000
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al mostrar los asientos."
 */

/**
 * @openapi
 * /llenarSelectAsientos:
 *   get:
 *     tags:
 *       - Libro Diario
 *     description: "Trae todos los ID´s y Nombres de las cuentas"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             example:
 *               - id_cuenta: 1
 *                 nombre: "Caja"
 *               - id_cuenta: 3
 *                 nombre: "Valores a depositar"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error al consumir las cuentas."
 */

/**
 * @openapi
 * /insertarAsiento:
 *   post:
 *     tags:
 *       - Libro Diario
 *     description: "Crea un nuevo asiento en el Libro Diario"
 *     requestBody:
 *       description: Requiere un array con las cuentas seleccionadas para el asiento y sus importes
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id_cuenta:
 *                   type: integer
 *                 importe:
 *                   type: number
 *               required:
 *                 - id_cuenta
 *                 - importe
 *           example:
 *                 - id_cuenta: 1
 *                   importe: 1000
 *                 - id_cuenta: 2
 *                   importe: -1000
 *     responses:
 *       201:
 *         description: CREATED
 *         content:
 *           application/json:
 *             example:
 *               mensaje: "Asiento creado con éxito"
 *       500:
 *         description: Error Interno del Servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Ocurrió un error al insertar el asiento."
 */

