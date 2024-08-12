const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, getCurrentUser } = require('../controller/auth.controller');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión, usando la estrategia local de Passport
router.post('/login', passport.authenticate('local', { session: false }), loginUser);

// Ruta para obtener los datos del usuario autenticado, usando la estrategia JWT de Passport
router.get('/current', passport.authenticate('jwt', { session: false }), getCurrentUser);

module.exports = router; // Exportar las rutas para ser utilizadas en la aplicación principal
