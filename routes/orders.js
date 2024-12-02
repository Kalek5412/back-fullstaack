const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getOrders,postOrders,putOrders,deleteOrders } = require('../controllers/orderController');
const router=Router();

router.get('/', getOrders);
router.post('/',[
    check('client_id','el documento es obligatorio').not().isEmpty(),
    check('total','el numro de documento es obligatorio').not().isEmpty(),
    check('doc_type','el nombre es obligatorio').not().isEmpty(),

    validarCampos
] ,postOrders);
router.put('/:id',[
    check('id').isNumeric(),
    validarCampos
], putOrders);
router.delete('/:id',[
    check('id').isNumeric(),
    validarCampos
], deleteOrders);

module.exports=router;