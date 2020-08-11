//esse arquivo tem como responsabilidade cadastrar as rotas da aplicação

const express = require("express");
const { route } = require("./app");

//criando meu routerizador
const routes = express.Router();

const alunoController = require("./controllers/aluno");
const postagemController = require("./controllers/postagem");

//rotas de usuario
routes.get("/alunos", alunoController.listar);
routes.get("/alunos/:id", alunoController.buscarPorId);
routes.post("/alunos", alunoController.store);


//rotas de postagens
routes.post("/postagens", postagemController.store);
routes.delete("/postagens/:id", postagemController.delete);

module.exports = routes;
