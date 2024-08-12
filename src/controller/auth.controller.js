const User = require('../model/user.model');
const { generateToken } = require('../utils/jwtFunctions');
const { createHash } = require('../utils/hashFunctions');

// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, cart } = req.body; // Extraer datos del cuerpo de la solicitud
        const hashedPassword = await createHash(password); // Encriptar la contraseña

        const newUser = new User({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword, // Guardar la contraseña encriptada
            cart
        });

        await newUser.save(); // Guardar el nuevo usuario en la base de datos
        res.status(201).json({ message: 'User registered successfully' }); // Responder con éxito
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err }); // Manejar errores
    }
};

// Controlador para iniciar sesión de un usuario
const loginUser = async (req, res) => {
    const token = generateToken({ id: req.user._id, email: req.user.email }); // Generar un token JWT para el usuario autenticado
    res.cookie('jwt', token, { httpOnly: true }); // Guardar el token en una cookie HTTP-only
    res.json({ message: 'Login successful', token }); // Responder con éxito
};

// Controlador para obtener los datos del usuario actual autenticado
const getCurrentUser = (req, res) => {
    res.json({ user: req.user }); // Responder con los datos del usuario extraído del token JWT
};

module.exports = { registerUser, loginUser, getCurrentUser }; // Exportar los controladores para ser utilizados en las rutas
