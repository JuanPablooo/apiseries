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
            const sql = "INSERT INTO series SET ?";
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
    buscaPorId(id){
        return new Promise((resolve, reject)=>{
            const sql = 'select *from series where id = ?';
            conexao.query(sql, id, (erro, retorno)=>{
                if(erro) reject('Erro ao buscar! ' + erro)

                else{
                    resolve(retorno[0])
                }
            })
            
        })
        
    }
    deletar(id){
        return new Promise((resolve, reject)=>{
            const sql = "DELETE from series where id = ?";
            conexao.query(sql, id, (erro, retorno)=>{
                if(erro) reject ('erro ao apagar ' + erro);
                else{
                    resolve(retorno)
                }
            })
        })
    }
    atualiza(serie){
        return new Promise((resolve, reject)=>{
            const sql = "UPDATE series SET ? WHERE id =?";
            conexao.query(sql, [serie, serie.id], (erro, retorno)=>{
                if(erro){
                    reject('erro ao atualizar ' + erro)
                }
                else{
                    resolve(retorno)
                }
            })
        })
    }
}
module.exports = new Series();