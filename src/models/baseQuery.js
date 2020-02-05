const conexao = require("../infra/conexao");





module.exports = (slq, params)=>{
    return new Promise((resolve, reject)=>{
        conexao.query(sql, params || "", (erro, retorno)=>{
            if(erro) return reject (erro);
            resolve(retorno)
        })
    })
}