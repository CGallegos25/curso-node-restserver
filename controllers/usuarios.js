const { response } = require('express');


const usuariosGet =  (req, res = response) => {
    const {id, nombre, apellido} = req.query;
    res.json({
        msg: 'get API - Controlador',
        id,
        nombre,
        apellido
    });
}

const usuariosPut = (req, res = response) => {
    const idParametro = req.params.id;
    res.json({
        msg: 'put API - Controlador',
        idParametro
    });
};

const usuariosPost = (req, res = response) => {
    const body = req.body;
    res.json({
        msg: 'post API - Controlador',
        body: body
    });
};

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - Controlador'
    });
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}