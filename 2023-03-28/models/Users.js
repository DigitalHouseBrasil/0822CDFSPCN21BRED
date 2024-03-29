const {Model, DataTypes} = require('sequelize');

class Users extends Model {
    static init (sequelize) {
        super.init({
              name: DataTypes.STRING,
              email: DataTypes.STRING,
        }, {
            sequelize
        })
    };

    static associate (models) {
        this.belongsTo( // belongsTo (chave estrangeira) <---> HasOne/Many (chave primária na tabela original)
            models.Categories,
            {
                foreignKey: 'categoryId',
                as: 'member'
            }
        )
    };
};

module.exports = Users;