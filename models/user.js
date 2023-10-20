const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'usertabel',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        })

    }
};

module.exports = User;