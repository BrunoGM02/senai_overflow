const Postagem = require("../models/Postagem");
const Aluno = require("../models/Aluno");
const { response } = require("express");

module.exports = {
    //listando as postagens
    async index(req, res){
        const postagens = await Postagem.findAll({
            //listando o aluno da postagem
            include:{
                association: "Aluno",
            //ao inves de trazer todos atributos, trago somendo o id, nome e ra
                attributes: ["id", "nome", "ra"],
            },
            //ordenando por data de criação e ordem decrescente
            order: [["created_at", "DESC"]],
        });

        res.send(postagens);

    },

    async store(req, res){
        const created_aluno_id = req.alunoId;

        const { titulo, descricao, imagem, gists } = req.body;

        try {
            const aluno = await Aluno.findByPk(created_aluno_id);

            if(!aluno){
                res.status(404).send({erro: "Aluno não encontrado"});
            }

            let postagem = await aluno.createPostagem({ 
                titulo,
                descricao,
                imagem,
                gists,
            });
    
            res.status(201).send(postagem);
        } catch (error) {
            return res.status(500).send({erro: "Não foi possível adicionar a postagem, tente novamente mais tarde"})
        }

       
    },

    async delete(req,res){
        //pegando o id do aluno que esta logado
        const created_aluno_id = req.alunoId;

        //pegando o id do post a apagar
        const { id } = req.params;

        //procura o post pelo id
        let postagem = await Postagem.findByPk(id);

        //se a postagem não existir, retorna not found
        if(!postagem){
            return res.status(404).send({ erro: "Postagem não encontrada" });
        }

        //se o aluno logado for diferente do aluno que criou a postagem retorna não autorizado
        if(postagem.created_aluno_id != created_aluno_id){
            return res.status(401).send({ erro: "Você não tem permissão para excluir essa postagem."});
        }

        //efetua a exclusão da postagem 
        await postagem.destroy();

        res.status(204).send();
    }
}