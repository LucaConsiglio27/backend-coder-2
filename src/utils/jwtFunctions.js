// src/utils/jwtFunctions.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno desde .env

const JWT_SECRET = process.env.JWT_SECRET || 'luca_jwt_key'; // Clave secreta para JWT

// Función para generar un token JWT
function generateToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '5m', // Duración del token
    });
    return token;
}

// Función para verificar y decodificar un token JWT
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error(`Invalid token: ${error.message}`);
    }
}

module.exports = { generateToken, verifyToken };
