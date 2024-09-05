// src/model/user.model.js

const mongoose = require('mongoose');

// Definición del esquema para el modelo de usuario
const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true }, // Nombre del usuario
    last_name: { type: String, required: true },  // Apellido del usuario
    email: { type: String, unique: true, required: true }, // Email único
    age: { type: Number, required: true }, // Edad del usuario
    password: { type: String, required: true }, // Contraseña en formato hash
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }, // Referencia al carrito
    role: { type: String, default: 'user' } // Rol del usuario
});

// Método para ocultar la contraseña al convertir el documento a JSON
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password; // Eliminar la contraseña del objeto JSON
    return user;
};

// Crear el modelo de usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
