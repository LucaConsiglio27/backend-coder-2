// src/controller/auth.controller.js

const User = require('../model/user.model');
const { generateToken } = require('../utils/jwtFunctions');
const { createHash } = require('../utils/hashFunctions');

// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, cart } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        // Crear el hash de la contraseña
        const hashedPassword = await createHash(password);

        // Crear un nuevo usuario
        const newUser = new User({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            cart
        });

        // Guardar el usuario en la base de datos
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

// Controlador para iniciar sesión de un usuario
const loginUser = async (req, res) => {
    try {
        // Generar un token JWT
        const token = generateToken({ id: req.user._id, email: req.user.email });

        // Guardar el token en una cookie HTTP-only
        res.cookie('jwt', token, { httpOnly: true, secure: true });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

// Controlador para obtener el usuario actual autenticado
const getCurrentUser = (req, res) => {
    try {
        res.json({ user: req.user });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user data', error: err.message });
    }
};

module.exports = { registerUser, loginUser, getCurrentUser };
