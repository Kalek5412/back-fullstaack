const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getOrderDetails,postOrderDetails,putOrderDetails,deleteOrderDetails } = require('../controllers/orderDetailController');
const router=Router();

router.get('/', getOrderDetails);
router.post('/',[
    check('order_id','el orden num es obligatorio').not().isEmpty(),
    check('book_id','el libro num de documento es obligatorio').not().isEmpty(),
    check('detail_price','el detalle de precio es obligatorio').not().isEmpty(),
    check('quantity','el cantidad es obligatorio').not().isEmpty(),
    validarCampos
], postOrderDetails);
router.put('/:id',[
    check('id').isNumeric(),
    validarCampos
], putOrderDetails);
router.delete('/:id',[
    check('id').isNumeric(),
    validarCampos
], deleteOrderDetails);

module.exports=router;