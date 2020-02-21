const express = require("express");
const cors = require("cors")
const app = express();

app.use(express.json());

// let alowCrossDomain = (req, res, next)=>{
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', '*')
//     res.header('Access-Control-Allow-Headers', '*')
//     next()
// }
// app.use(alowCrossDomain)
app.use(cors())

const auth = require("./routes/authRoutes");
const series = require('./routes/seriesRoutes');
const authMidd = require('./middlewares/auth');
//rota publica
app.use('/auth', auth);
//usando middl
app.use(authMidd);

app.use('/series', series);


module.exports = app;
