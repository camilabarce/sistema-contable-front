const { exec } = require('child_process');
const path = require('path');

// Ruta para cada carpeta
const backend = path.join(__dirname, 'Back-Develop');
const frontend = path.join(__dirname, 'Front-Develop');

// Comandos a ejecutar en cada carpeta
const nodeCommand = 'npm run dev';
const angularCommand = 'ng serve';

// Función para ejecutar un comando en una carpeta. 
function ejecutarComando(comando, carpeta) {
    //'cwd' es el Directorio de Trabajo Actual (Current Working Directory)
  const ejecucion = exec(comando, { cwd: carpeta }, (error) => {
    if (error) {
        console.error(`\nError en ejecución de '${comando}' en '${carpeta}':`, error);
        return;
      }
  });

// Capturo la señal SIGINT (Ctrl + C). Esto para cortar el flujo en caso de querer finalizar los servicios con CTRL + C por consola
process.on('SIGINT', () => {
    // Finalizo el proceso cuando se cancela el servicio.
    ejecucion.kill('SIGINT');
  });
}

// Ejecuto los comandos en ambas carpetas
ejecutarComando(nodeCommand, backend);
ejecutarComando(angularCommand, frontend);

console.log(`\nServicios '${nodeCommand}' y '${angularCommand}' en marcha`);