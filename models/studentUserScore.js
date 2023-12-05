const Sequelize = require('sequelize');

class StudentUserScore extends Sequelize.Model {
    static initiate(sequelize) {
        StudentUserScore.init(
            {
                idx: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },

                process_score_one: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },

                process_score_two: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                process_score_three: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                process_score_four: {
                    type: Sequelize.INTEGER,
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
                modelName: 'StudentUserScore',
                tableName: 'student_user_scores',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        );
    }

    static associate(models) {
        StudentUserScore.belongsTo(models.StudentUser, { foreignKey: 'student_user_idx', onDelete: 'CASCADE' });
    }
}

module.exports = StudentUserScore;
