#Deploy para Windows

##Instalacion de MongoDB 

1. Descarga de la version [Windows Server 2008 R2 64-bit and later, with SSL support x64](https://www.mongodb.com/download-center#community)
2. Ejecuta el instalador y sigue las instrucciones
3. Para lanzar el servicio ejecuta `mongod --dbpath "ruta de la BD"`

##Instalacion de node + npm
1. Descarga la version de [Node.js](https://nodejs.org/dist/v4.5.0/node-v4.5.0-x64.msi)
2. Ejecuta el instalador y sigue las instrucciones
3. No lo olvidarse de marcar la opcion de añadirlo a las variables de entorno, si no habra que hacerlo manual

##Instalacion del proyecto
1. Ejecuta `git clone https://github.com/rached193/UNIZAR-30246-WebEngineering-NodeAppShorter.git`, para descargarte el codigo del respositorio.
2. En la carpeta del proyecto ejecuta `npm install`, para instalar las depencias del proyecto.
3. Ejecuta `npm start`, para lanzar la aplicacion y luego `npm test` para lanzar los Test.
