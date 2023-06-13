const { response } = require('express');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {
    const { correo, password } = req.body;
    try {

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                 msg: 'Correo / Password no son correctos - correo'
            });
        }
        // Si el usuario está activo que
        if ( !usuario.estado) {
            return res.status(400).json({
                msg: 'Correo / Password no son correctos - estado : false'
            });
        }
        // Verifcar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Correo / Password no son correctos - password'
            });
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const {correo, nombre, img} = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                rol: 'USER_ROLE',
                img,
                google: true
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en BD tiene el estado false
        if (!usuario.estado) {
            return res.status(401).json({ 
                msg: 'Hable con el administraor, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (err) {
        console.log(err);
        json.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        });
    }

    
}

module.exports = {
    login,
    googleSignIn
}