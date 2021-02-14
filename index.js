const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const perguntaModel = require('./models/Pergunta.model');
const RespostaModel = require('./models/Resposta.model');
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
app.get("/", (req, res) => {
    perguntaModel.findAll({
            raw: true,
            order: [
                ['id', 'desc']
            ]
        })
        .then((p) => {
            res.render('home', {
                pergunta: p
            });
        });
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
});
app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id;
    perguntaModel.findOne({
        where: { id: id }
    }).then((pergunta) => {
        if (pergunta != undefined) {
            RespostaModel.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'desc']
                ]
            }).then((respostas) => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });

            });
        } else {
            console.log("NOT FOUND");
            res.redirect('/');
        }
    });
});

app.post('/responder', (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.perguntaId;
    RespostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        console.log('create Response')
        res.redirect('/pergunta/' + perguntaId)
    }).catch((err) => {
        console.log('A err ocorr ' + err);
    });
});

/* app.get('/responder', (req, res) => {
    res.render('responder')
}); */

app.listen('8181');