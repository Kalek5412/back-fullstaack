const {Router}=require('express');

const { getBusqueda} = require('../controllers/busqueda');

const router = Router();

  router.get("/:busqueda",getBusqueda );
 

module.exports=router  