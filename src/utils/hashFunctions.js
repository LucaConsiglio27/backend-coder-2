import bcrypt from 'bcrypt'; // Importar bcrypt para encriptar y verificar contraseñas

const SALT_ROUND = 10; // Definir el número de rondas de sal para el hash

// Función para crear un hash de una contraseña
export async function createHash(password) {
    const hashPassword = await bcrypt.hash(
        password, // Contraseña a encriptar
        bcrypt.genSaltSync(SALT_ROUND) // Generar una sal y aplicarla a la contraseña
    );
    return hashPassword; // Devolver la contraseña encriptada
}

// Función para verificar si una contraseña ingresada coincide con su hash almacenado
export async function verifyPassword(password, hash) {
    const isPasswordCorrect = await bcrypt.compare(password, hash); // Comparar la contraseña con el hash
    return isPasswordCorrect; // Devolver true si coinciden, false en caso contrario
}
