const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Aluno = require("../models/Aluno");
const Postagem = require("../models/Postagem");
const Comentario = require("../models/Comentario");


//criamos a conexao com os dados da configuracao
const conexao = new Sequelize(dbConfig); 

//inicializando os models
Aluno.init(conexao);
Postagem.init(conexao);
Comentario.init(conexao);

//inicializando as associações
Aluno.associate(conexao.models);
Postagem.associate(conexao.models);
Comentario.associate(conexao.models);


//exportamos a conexao  
module.exports = conexao;
