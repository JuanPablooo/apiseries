const express = require('express');

const app = express();
const consign = require('consign');
const bosyParser = require('body-parser');

const customExpress = () =>{
    app.use(bosyParser.json());
    
//injetando dependencia app no na pasta controllers assim todos arquivos da pasta irao ter acesso ao app
consign()
    .include('controllers')
    .include('models')
    .into(app)
    return app
}

module.exports = customExpress();