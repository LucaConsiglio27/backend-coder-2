// src/config/passport.config.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../model/user.model');
const { verifyPassword } = require('../utils/hashFunctions');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno desde .env

const JWT_SECRET = process.env.JWT_SECRET || 'luca_jwt_key'; // Clave secreta para JWT

// Estrategia de autenticación local
passport.use('local', new LocalStrategy({
    usernameField: 'email', // Campo de nombre de usuario
    passwordField: 'password' // Campo de contraseña
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: 'User not found' });

        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Invalid password' });

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Función para extraer el token JWT de las cookies
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

// Opciones para la estrategia JWT
const jwtOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_SECRET
};

// Estrategia de autenticación JWT
passport.use('jwt', new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Token not matched' });
        }
    } catch (err) {
        return done(err, false);
    }
}));

module.exports = passport;

