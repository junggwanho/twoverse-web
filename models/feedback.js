const Sequelize = require('sequelize');

class Feedback extends Sequelize.Model {
    static initiate(sequelize) {
        Feedback.init(
            {
                idx: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                feedback: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
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
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'feedback',
                tableName: 'feedback',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci', 
            }
        );
    }

    static associate(models) {
        Feedback.belongsTo(models.StudentUser, { foreignKey: 'student_user_idx', onDelete: 'CASCADE' });
    }
}

module.exports = Feedback;
