//este archivo contendra todas la rutas de nuestra web
const express = require("express");
const router = express.Router();
const passport = require('passport');

router.get('/',(req,res,next)=>{
    res.render('index');
});

//rutas para registrar a un usuario
router.get('/signup',(req,res,next)=>{
    res.render('signup');
});

router.post('/signup',passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

//rutas para ingresar a la aplicacion
router.get('/signin',(req,res,next)=>{
    res.render('signin');
});

router.post('/signin',passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/logout',(req,res,next)=>{
    req.logout();
    res.redirect('/');
});

//middleware
router.use((req,res,next)=>{
    isAuthenticated(req,res,next);
});

router.get('/profile',(req,res,next)=>{
    res.render('profile');
});

function isAuthenticated(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/');
}


module.exports = router; //pueda ser usada en cualquier parte


