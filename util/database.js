const Sequelize = require('sequelize');

const sequelize = new Sequelize('practice', process.env.MYSQL_DB_USERNAME, process.env.MYSQL_DB_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;