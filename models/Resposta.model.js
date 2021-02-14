const Sequelize = require('sequelize');
const connection = require('../database/database');

const Resposta = connection.define('resposta', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({ force: false }).then(() => {
    console.log('created table');
})

module.exports = Resposta;