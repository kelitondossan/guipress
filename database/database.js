const Sequilize = require("sequelize");
//conexão com DB-mysql
const connection = new Sequilize('guiapress', 'root', '12345',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

//exporta a conexão do db para chamar no index.js
module.exports = connection;