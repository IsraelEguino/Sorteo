const mongoose = require('mongoose');

const Usuario = {
    nombre: String,
    correo: String,
    contrasenia: String,
    direccion: String,
    numeroDeContacto: String,
    entidad: String,
    tipo: String,
    boletos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'boleto' }]
};

module.exports = Usuario;