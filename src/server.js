// src/server.js

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport.config');
const authRoutes = require('./routes/auth.routes');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();
const port = process.env.PORT || 3000; // Puerto definido en variables de entorno

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Rutas de autenticación
app.use('/api/sessions', authRoutes);

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        // Iniciar el servidor solo si la base de datos se conecta correctamente
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err.message);
        process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
    });
