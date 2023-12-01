const Sequelize = require('sequelize');

class ProcessQuizYN extends Sequelize.Model {
    static initiate(sequelize) {
        ProcessQuizYN.init({
            idx: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            quiz_idx: {
                type: Sequelize.STRING(16),
                al1lowNull: false,
                unique: true
            },
            quizYN: {
                type: Sequelize.STRING(255), 
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'processQuizYN',
            tableName: 'process_quiz_YN',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }); 
    }
}

module.exports = ProcessQuizYN;
