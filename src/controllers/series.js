//  const jwt = require('jsonwebtoken');
//  const authConfig = require('../config/auth')
const serieDAO = new (require("../models/Series"))();

 
 module.exports = {

    async listar (req, res) {
        const lista = await serieDAO.listar()
        if(lista) return res.send(lista);
        res.status(404).send({erro:"lista vazia"})
        
    },
    async insere(req, res){
        let serie = req.body;
        try {
            const resultado = await serieDAO.insere(serie);
    
            const insertedId = resultado.insertId;
            serie = {"id": insertedId, ...serie}
            return res.status(201).send(serie)
            
        } catch (erro) {
            return res.status(500).send(erro)
        }
        
    },
    async buscarPorId(req, res){
        const id = req.params.id;
        let serie = await serieDAO.buscaPorId(id);
        serie = serie[0];
        if(!serie){
            console.log("jedsuiofsduih")
            return res.status(500).send({erro: "erro ao buscar serie"});
        }
        
        return res.send(serie);
    },

    async atualiza(req, res){
        const id = req.params.id;
        const serie = req.body;
        serie.id = id;
        const retorno = await serieDAO.atualiza(serie);

        if(!retorno.affectedRows){
            res.status(404).send({"serie": "nao emcontrada"});
            return;
        }
        res.send(serie)
    },
   

   async delete(req, res){
        const id = req.params.id;

        const retorno = await serieDAO.deletar(id);

        if(!retorno.affectedRows)
            return res.status(404).send({erro: "serie nao encontrada"});

        res.status(204).send();
   }
}

