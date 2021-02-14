const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const perguntaModel = require('./models/Pergunta.model');
// database
connection
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

//express esta usando engine ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))
    // body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// rotas
app.get("/", function(req, res) {
    res.render('home');
})
app.get("/:perguntar", function(req, res) {
    res.render('perguntar');
})
app.post("/salvapergunta", function(req, res) {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    perguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/');
    });
    // res.send(`formulario recebido ${titulo} <br> ${descricao} `);
})

app.listen('8181');