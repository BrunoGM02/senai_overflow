const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Aluno = require("../models/Aluno")

//criamos a conexao com os dados da configuracao
const conexao = new Sequelize(dbConfig); 

Aluno.init(conexao);

//exportamos a conexao  
module.exports = conexao;
