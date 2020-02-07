const baseQuery = require("./baseQuery");

class Series{
    listar(){     
       //return console.log("jljhsdfj")   
        return baseQuery('select *from series');            
    }
    insere(serie){
        return baseQuery("INSERT INTO series SET ?", serie);
            
    }
    buscaPorId(id){
        //return console.log("jljhsdfj") 
        return baseQuery('select *from series where id = ?', id);
        
    }
    deletar(id){
        return baseQuery("DELETE from series where id = ?", id);
            
    }
    atualiza(serie){
        return baseQuery("UPDATE series SET ? WHERE id =?", [serie, serie.id]);
            
    }
}
module.exports = Series;