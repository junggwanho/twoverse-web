const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initate(sequelize) {
        User.init({
            id: {
                type: Sequelize.STRING(16),
                allowNull: false,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(16),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(16),
                allowNull: false,
            },
            phonenumber: {
                type: Sequelize.STRING(11),
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};

module.exports = User;