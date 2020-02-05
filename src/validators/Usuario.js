const { check, body } = require('express-validator');
const usuarioDao =  require("../models/Usuarios");
class UsuarioValidator{
    static validacoes(){
        return [
            check('nome').isLength({min:3, max:50})
            .withMessage("deve ter entre  3 a 50 caratcters"),

            check('email').isEmail()
            .withMessage("deve ser um email valido"),

            check('senha').isLength({min:8, max:15})
            .withMessage("deve ter entre 8 e 15 caracters"),
            body('email').custom( email =>{
                return usuarioDao.buscarPorEmail(email)
                .then( usuario =>{
                    if(usuario) return Promise.reject("email ja em uso");
                })
            })
        ]
    }
}
module.exports = UsuarioValidator;