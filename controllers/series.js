 series = ( app ) => {
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
        const serie = req.body;
        
        seriesDao.insere(serie)
        .then(resultado =>{
            res.status(201).send(resultado)
        })
        .catch(erro =>{
            console.log('erro ao inserir')
            res.status(500).send(erro)
        })
    })
}

module.exports = series;