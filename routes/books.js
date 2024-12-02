const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getBooks,
  postBooks,
  putBooks,
  deleteBooks,
} = require("../controllers/bookController");
const router = Router();

router.get("/", getBooks);
router.post("/",[
    check('isbn','el isbn es obligatorio').not().isEmpty(),
    check('name','el nombre de documento es obligatorio').not().isEmpty(),
    check('stock','el stock es obligatorio').not().isEmpty(),
    check('current_price','el precio actual es obligatorio').not().isEmpty(),
    validarCampos
], postBooks);
router.put("/:id", [check("id").isNumeric(), validarCampos], putBooks);
router.delete("/:id", [check("id").isNumeric(), validarCampos], deleteBooks);

module.exports = router;
