const conexao = require('../infra/conexao');

class Series{
    lista(){
        
        return new Promise((resolve, reject)=>{
            console.log('jsdfjsdf');
            const sql = 'select *from series';
            conexao.query(sql, (erro, retorno)=>{
                if(erro){
                    console.log('errou')
                    reject(erro);
                }
                else{
                    console.log('foi certo');
                    resolve(retorno);
                }
            })
        })
    }
    insere(serie){
        return new Promise((resolve, reject)=>{
            const sql = "INSERT INTO series SET?";
            conexao.query(sql, serie, (erro, retorno)=>{
                if(erro){
                    reject(erro)
                }
                else{
                    resolve(retorno)
                }
            })
        })
    }
}
module.exports = new Series();