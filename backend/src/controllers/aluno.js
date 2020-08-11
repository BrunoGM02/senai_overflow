//realiza todas as interações q tem q ser feita com os alunos
const { Op } = require("sequelize");
const Aluno = require("../models/Aluno");

module.exports = {
//lista todos os alunos
   async listar(req, res){
        const alunos = await Aluno.findAll();

        res.send(alunos);
    },

    //buscar um aluno pela id
    async buscarPorId(req, res){
        const { id } = req.params;

    //busca o aluno pela chave
        let aluno = await Aluno.findByPk(id, { raw: true });


    //verifica se o aluno não foi encontrado 
        if (!aluno){
            return res.status(404).send({erro: "Aluno não encontrado" });
        }

        console.log(aluno);

        delete aluno.senha; 

    //retorna o aluno encontrado
        res.send(aluno);

    },

    //metodo responsavel por fazer as inserções
   async store(req, res){
            const { ra, nome, email, senha } = req.body;
            
            //verifica se o aluno ja existe
            //select * from alunos where ra = ? or email = ?

            let aluno = await Aluno.findOne({
                where: {
                    [Op.or]: [
                        {ra: ra},
                        {email: email}
                    ]
                }
            });

            if(aluno){
                return res.status(400).send({erro: "Aluno ja cadastrado"});
            }

           
            aluno = await Aluno.create( {ra, nome, email, senha} );

          
            res.status(201).send(aluno);  
    },

    update(){

    },

    delete(){

    },

};