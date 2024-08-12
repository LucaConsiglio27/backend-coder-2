const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/user.model');
const { verifyPassword } = require('../utils/hashFunctions');

// Estrategia de autenticación local usando nombre de usuario y contraseña
passport.use(new LocalStrategy({
    usernameField: 'email', // Campo que se utilizará como nombre de usuario
    passwordField: 'password' // Campo que se utilizará para la contraseña
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email }); // Buscar el usuario por email
        if (!user) return done(null, false, { message: 'User not found' }); // Manejar caso de usuario no encontrado

        const isMatch = await verifyPassword(password, user.password); // Verificar la contraseña
        if (!isMatch) return done(null, false, { message: 'Invalid password' }); // Manejar caso de contraseña inválida

        return done(null, user); // Autenticación exitosa
    } catch (err) {
        return done(err); // Manejar errores en el proceso
    }
}));

// Función para extraer el token JWT de una cookie
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt']; // Extraer el token de la cookie 'jwt'
    }
    return token;
};

// Opciones para la estrategia JWT
const opts = {
    jwtFromRequest: cookieExtractor, // Especificar de dónde extraer el token
    secretOrKey: 'secret' // Clave secreta para verificar el token 
};

// Estrategia de autenticación JWT
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id); // Buscar el usuario por el ID del payload
        if (user) {
            return done(null, user); // Autenticación exitosa
        } else {
            return done(null, false); // Usuario no encontrado
        }
    } catch (err) {
        return done(err, false); // Manejar errores en el proceso
    }
}));

module.exports = passport; // Exportar la configuración de Passport
