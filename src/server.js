const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport.config');
const authRoutes = require('./routes/auth.routes');

const app = express();
const port = 3000; // Definir el puerto en el que correrá el servidor

app.use(express.json()); // Middleware para parsear JSON en las solicitudes
app.use(cookieParser()); // Middleware para parsear cookies
app.use(passport.initialize()); // Inicializar Passport para autenticación

app.use('/api/sessions', authRoutes); // Usar las rutas de autenticación definidas

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
