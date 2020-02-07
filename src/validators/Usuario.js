const { check, body } = require('express-validator');
const usuarioDao =  new (require("../models/Usuarios"))();
class UsuarioValidator{
    static validacoes(){
        return [
            body('email').custom(async email =>{
               let usuario = await usuarioDao.buscaPorEmail(email)
                
                usuario = usuario[0];
                if(usuario){
                    return Promise.reject("E-mail ja esta em uso");
                }
            }),
            check('nome').isLength({min:3, max:50})
            .withMessage("deve ter entre  3 a 50 caratcters"),

            check('email').isEmail()
            .withMessage("deve ser um email valido"),

            check('senha').isLength({min:8, max:15})
            .withMessage("deve ter entre 8 e 15 caracters")
        ]
    }
}
module.exports = UsuarioValidator;