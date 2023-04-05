// Importar a classe Sequelize
const Sequelize = require('sequelize');

const Users = require('../models/Users');
const Categories = require('../models/Categories')


// Importar as configurações
const databaseConfigurations = require('../config/database');

// Criar a conexão
const connection = new Sequelize(databaseConfigurations);

Users.init(connection);
Categories.init(connection);

Users.associate(connection.models);
Categories.associate(connection.models);

// Exportar a conexão
module.exports = connection;