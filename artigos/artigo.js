const Sequelize = require("sequelize");
const connection = require("../database/database");
//chama conexão db para a criação do codigo a baixo

//variavel de relacionamento pode criar separadamente mais não quis
const categoria = require ("../categorias/categoria");

//criação da tabela artigos ao banco de dados 
const artigo = connection.define('artigos', {
    title:{
        type: Sequelize.STRING,
        allowNull:false
    }, slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

categoria.hasMany(artigo); // uma categoria tem muitos artigos 

artigo.belongsTo(categoria);//belongs significa pertence a categoria fazendo relacionamento entre artigoe categoria 



module.exports = artigo;
