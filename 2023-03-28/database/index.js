// Importar a classe Sequelize
const Sequelize = require('sequelize');

const Users = require('../models/Users')

// Importar as configurações
const databaseConfigurations = require('../config/database');

// Criar a conexão
const connection = new Sequelize(databaseConfigurations);

Users.init(connection);

// Exportar a conexão
module.exports = connection;