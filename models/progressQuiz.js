const Sequelize = require('sequelize');

class StudentUser extends Sequelize.Model {
    static initiate(sequelize) {
        StudentUser.init({
            idx: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            process: {
                type: Sequelize.STRING(16),
                allowNull: false,
                unique: true,
            },
            quiz: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            quizYN: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'progressQuiz',
            tableName: 'progress_quiz',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }); 
    }
}

module.exports = StudentUser;
