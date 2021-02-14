const Sequelize = require('sequelize');

const connection = new Sequelize('database_perguntas', 'root', null, {
    host: "localhost",
    dialect: 'mysql',
})

module.exports = connection;