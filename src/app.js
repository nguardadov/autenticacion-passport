'use strict'
 //agregando las librerias necesarias
 const express = require('express'); //libreria para express
 const engine = require('pug'); // motor de plantillas
 const path = require('path'); // para manejar rutas del so
 const morgan = require('morgan'); // muestra mensajes desde consola
 const passport = require('passport') // libreria para el manejo de la autenticacion
 const session = require('express-session'); // libreria para el manejo de sesiones
 const flash = require('connect-flash'); // para el paso de mensajes entre paginas web

 //inicializaciones
 const  app = express(); // iniciando el servidor de express
 require('../src/configs/database'); // coneccion a mongo
 require('./passport/local-auth');
 
 app.set('port', process.env.PORT || 3001); // agregando el puerto por donde se escucharan las peticiones
 /***configuraciones******/
 //vistas
 app.set('views',path.join(__dirname,'views'));
 app.set('view engine','pug');
/*************************/

 //middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'hola mundo',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    app.locals.signupMessage= req.flash('signupMessage');
    app.locals.signinMessage= req.flash('signinMessage');
    app.locals.user = req.user;
    next();
})
 //Routes
app.use('/',require('./routes/routes'));
 //starting server
 app.listen(app.get('port'),()=>{
     console.log(`Server on port ${app.get('port')}`)
 });