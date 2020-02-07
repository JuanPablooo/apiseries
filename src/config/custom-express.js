const express = require('express');

const app = express();
const consign = require('consign');
const bosyParser = require('body-parser');

const customExpress = () =>{
    app.use(bosyParser.json());
    app.use((req, res, next)=>{
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
     })
//injetando dependencia app no na pasta controllers assim todos arquivos da pasta irao ter acesso ao app
consign()
    .include('controllers')
    .include('models')
    .into(app)
    return app
}

module.exports = customExpress();