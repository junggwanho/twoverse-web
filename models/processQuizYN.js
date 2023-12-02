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
                allowNull: false,
                unique: true
            },
            quizYN: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            student_user_idx: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'student_users', // 참조할 모델의 이름
                    key: 'idx', // 참조할 모델의 외래 키
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'ProcessQuizYN',
            tableName: 'process_quiz_YN',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(models) {
        ProcessQuizYN.belongsTo(models.StudentUser, { foreignKey: 'student_user_idx', onDelete: 'CASCADE' });
    }
}

module.exports = ProcessQuizYN;