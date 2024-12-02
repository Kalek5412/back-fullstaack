const Role = require('../models/role');
const Usuario = require('../models/usuario');

const isRolValido=async(rol='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new  Error(`El rol ${rol} no esta registrado de la bd`);
    }
}

const emailExiste=async(correo='')=>{
const existemail=await Usuario.findOne({correo});
    if(existemail){
        throw new Error(`El correo ${correo} ya esta en uso!`);
/*         return res.status(400).json({
            msg:'Ese correo ya esta en uso!'
        }); */
    }
}

const existePorId=async(id)=>{
    const existeId=await Usuario.findById(id);
        if(!existeId){
            throw new Error(`El ${id} no eiste!`);
        }
    }

module.exports={isRolValido,emailExiste,existePorId}