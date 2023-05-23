const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
};

// Verificar si el correo existe
const existeCorreo = async(correo) => {
    const correoE = await Usuario.findOne({correo});
    if(correoE) {
        throw new Error(`El correo ${correo}, ya esta registrado`);
    }
};

// Verificar si el _id existe
const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    console.log(existeUsuario);
    if(!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
};


module.exports = {
    esRoleValido,
    existeCorreo,
    existeUsuarioPorId
}