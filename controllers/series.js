 const jwt = require('jsonwebtoken');
 const authConfig = require('../config/auth')
 
 series = ( app ) => {
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
    app.get('/series', (req, res)=>{
        const seriesDao = app.models.Series
        seriesDao.lista()
        .then(resultado => {
            res.send(resultado)
        })
        .catch(erro =>{
            console.log('erro ao consultar ' + erro)
            res.status(500).send(erro)
        })

    })
    app.post('/series', (req, res)=>{
        const seriesDao = app.models.Series;
        let serie = req.body;
        
        seriesDao.insere(serie)
        .then(resultado =>{
            const insertedId = resultado.insertId;
            serie = {"id": insertedId, ...serie}
            res.status(201).send(serie)
        })
        .catch(erro =>{
            console.log('erro ao inserir')
            res.status(500).send(erro)
        })
    })
    app.get("/series/:id", (req, res)=>{
        const id = req.params.id;
        const serieDao = app.models.Series;
        serieDao.buscaPorId(id)
        .then(serie =>{
            // se a serie nao existir devolver erro para o cliente
            if(!serie){
                res.status(404).send()
            }
            else{
                res.send(serie)
            }
        })
        .catch(erro =>{
            console.log("erro ao buscar serie")
            res.status(500).send({erro: "erro ao buscar"})
        })
    })
   
    app.delete("/series/:id", (req, res)=>{
        const id = req.params.id;
        serieDao = app.models.Series;
        serieDao.deletar(id)
        .then(retorno =>{
            if(!retorno.affectedRows){
                res.status(404).send({erro: "serie nao encontrada"});
                return;
            }
            res.status(204).send();
        })
        .catch(erro =>{
            console.log("ERRO ao deletar " + erro);
        })
    })
    app.put("/series/:id", (req, res)=>{
        const id = req.params.id;
        const serie = req.body;
        serie.id = id;
        serieDao = app.models.Series;
        serieDao.atualiza(serie)
        .then(retorno => {
            if(!retorno.affectedRows){
                res.status(404).send({"serie": "nao emcontrada"});
                return;
            }
            res.send(serie)
            
        })
        .catch(erro => res.status(500).send(erro))

    })
}

module.exports = series;