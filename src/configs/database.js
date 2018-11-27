  //conneccion a la base de datos
const mongoose = require('mongoose'); // orm a utilizar
const {mongodb} = require('./keys'); // cargando las credenciales

//conectando a la base de datos
mongoose.connect(mongodb.URI,{
    useNewUrlParser:true
}).then(db=>console.log('Conexion exitosa'))
.catch(err => console.error(err));

