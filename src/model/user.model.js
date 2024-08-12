const mongoose = require('mongoose');

// Definición del esquema para el modelo de usuario
const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true }, // Nombre del usuario, campo obligatorio
    last_name: { type: String, required: true },  // Apellido del usuario, campo obligatorio
    email: { type: String, unique: true, required: true }, // Email del usuario, debe ser único y obligatorio
    age: { type: Number, required: true }, // Edad del usuario, campo obligatorio
    password: { type: String, required: true }, // Contraseña del usuario, será almacenada en formato hash
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }, // Referencia al carrito de compras del usuario
    role: { type: String, default: 'user' } // Rol del usuario, por defecto es 'user'
});

// Método para ocultar la contraseña al convertir el documento en un objeto JSON
userSchema.methods.toJSON = function () {
    const user = this.toObject(); // Convertir el documento de Mongoose a un objeto plano
    delete user.password; // Eliminar el campo de la contraseña antes de enviar la respuesta
    return user;
};

// Crear el modelo de usuario basado en el esquema definido
const User = mongoose.model('User', userSchema);

module.exports = User; // Exportar el modelo para ser utilizado en otras partes de la aplicación
