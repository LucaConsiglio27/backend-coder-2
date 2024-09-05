// src/routes/auth.routes.js

const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, getCurrentUser } = require('../controller/auth.controller');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', passport.authenticate('local', { session: false }), loginUser);

// Ruta para obtener el usuario actual
router.get('/current', passport.authenticate('jwt', { session: false }), getCurrentUser);

module.exports = router;

