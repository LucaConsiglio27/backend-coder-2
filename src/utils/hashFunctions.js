// src/utils/hashFunctions.js

const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10; // Número de rondas de sal para bcrypt

// Función para crear un hash de la contraseña
async function createHash(password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// Función para verificar la contraseña ingresada con el hash almacenado
async function verifyPassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
}

module.exports = { createHash, verifyPassword };
