const { Model, DataTypes } = require("sequelize");

class Comentario extends Model{
    static init(sequelize){
        super.init(
            {
                descricao: DataTypes.TEXT,
            }, 
            {
             sequelize,
            }
        );
    }
    
    static associate(models){
        //um comentario pertence a uma postagem
        this.belongsTo(models.Postagem);
        //um comentario tbm pertence a um aluno
        this.belongsTo(models.Aluno);

    }
}

module.exports = Aluno;