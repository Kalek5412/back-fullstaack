const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getClients,postClients,putClients,deleteClients } = require('../controllers/clientController');
const router=Router();

router.get('/', getClients);
router.post('/',[
    check('doc_type','el documento es obligatorio').not().isEmpty(),
    check('doc_number','el numro de documento es obligatorio').not().isEmpty(),
    check('first_name','el nombre es obligatorio').not().isEmpty(),
    check('last_name','el apellido es obligatorio').not().isEmpty(),
    check('email','el correo no es valido').isEmail(),
    validarCampos
], postClients);
router.put('/:id',[
    check('id').isNumeric(),
    validarCampos
], putClients);
router.delete('/:id',[
    check('id').isNumeric(),
    validarCampos
], deleteClients);

module.exports=router;