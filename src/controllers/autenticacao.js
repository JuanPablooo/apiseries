
const { check, validationResult } = require('express-validator');

const usuarioDao = new (require("../models/Usuarios"))();
const jwt = require('jsonwebtoken');
const authConfig = require("../config/auth");
const bcrypt = require('bcryptjs');
 

gerarToken = (params)=> {
    return jwt.sign(params, authConfig.secret, {
        expiresIn:60

    })
}

module.exports={
    async registra(req, res){
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            console.log(erros);
            return res.status(400).send({erros})

            
        }
        let usuario = req.body;
        try {
            usuario.senha = await bcrypt.hash(usuario.senha, 10);
    
            const resultado = await usuarioDao.insere(usuario);
            usuario = {id: resultado.insertId, ...usuario}
            return res.status(201).send({
                usuario,
                token: gerarToken({id:usuario.id})
            });
            
        } catch (erro) {
            res.status(500).send(erro)
        }


    },
    async autentica(req, res){
        const {email, senha} = req.body;
        try {

            let usuario = await usuarioDao.buscaPorEmail(email);
            usuario = usuario[0]
            if(!usuario){
                console.log('uu')
                return res.status(400).send({})
            }
            if(await !bcrypt.compare(senha, usuario.senha)){
                return res.status(400).send({erro: "senha invalida"})
            }

            res.send({
                usuario,
                token: gerarToken( {id:usuario.id})
            });
        } catch (erro) {
            console.log(erro)
            res.status(500).send(erro)
            
        }
    }
}

