const Sequelize = require("sequelize");
const connection = require("../database/database");
//chama conexão db para a criação do codigo a baixo

//criação da tabela categorias ao banco de dados 
const categoria = connection.define('categorias', {
    title:{
        type: Sequelize.STRING,
        allowNull:false
    }, slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})



module.exports = categoria;
