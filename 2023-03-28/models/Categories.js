const {Model, DataTypes} = require('sequelize');

class Categories extends Model {
    static init (sequelize) {
        super.init({
              name: DataTypes.STRING,
        }, {
            sequelize
        })
    };

    static associate (models) {
        this.hasMany(
            models.Users,
            {
                foreignKey: 'categoryId',
                as: 'members'
            }
        )
    };
};

module.exports = Categories;