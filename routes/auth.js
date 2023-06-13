const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('password', 'El password es obligatoria').not().isEmpty(),
    check('correo', 'El correo no es válido.').isEmail(),
    validarCampos
], login);

router.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;