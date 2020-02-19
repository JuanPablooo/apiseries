const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({erro:"nao autorizado"});

    }
    const parts = authHeader.split(' ');
    if(!parts.lenght === 2){
        return res.status(401).send({erro:"token mal formatado"});
    }
    const [bearer, token] = parts;

    jwt.verify(token, authConfig.secret, (erro, user)=>{
        if(erro) return res.status(401).send({erro: "token invalido"});
        req.userId = user.id;
        return next()

    })
 }