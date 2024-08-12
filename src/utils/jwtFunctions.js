import jwt from 'jsonwebtoken'; // Importar jsonwebtoken para trabajar con tokens JWT

const JWT_SECRET = "secret"; // Definir la clave secreta para firmar los tokens (debería ser una variable de entorno)

// Función para generar un token JWT con un payload específico
export function generateToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '5m', // Definir la duración del token
    });
    return token; // Devolver el token generado
}

// Función para verificar la validez de un token JWT
export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Verificar y decodificar el token
        return decoded; // Devolver el payload decodificado si el token es válido
    } catch(error) {
        throw new Error(`Invalid token: ${error}`); // Manejar errores si el token es inválido
    }
}
