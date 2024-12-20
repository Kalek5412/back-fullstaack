require('dotenv').config()
const Server = require('./models/server')
const db = require('./database/config'); 



const server=new Server();

db.sync({ force: false })
  .then(() => {
    console.log('Base de datos y tablas sincronizadas correctamente.');
  })
  .catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  });

//port 3000
server.listen();
