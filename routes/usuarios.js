const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, existeCorreo, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id correcto').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password debe tener más de 6 letras').isLength({ min:6 }),
    check('correo', 'El correo no es válido.').isEmail(),
    check('rol').custom( esRoleValido ),
    check('correo').custom( existeCorreo ),
    validarCampos
], usuariosPost);

router.delete('/:id', 
[
    check('id', 'No es un id correcto').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],
usuariosDelete);

module.exports = router;