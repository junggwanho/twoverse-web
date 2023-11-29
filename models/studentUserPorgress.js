const Sequelize = require('sequelize');

class StudentUserProgress extends Sequelize.Model {
    static initiate(sequelize) {
        StudentUserProgress.init(
            {
                idx: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },

                progress_one: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },

                progress_two: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                progress_three: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                progress_four: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                progress_five: {
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
                modelName: 'StudentUserProgress',
                tableName: 'student_user_progresses',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            }
        ); 
    }

    static associate(models) {
        StudentUserProgress.belongsTo(models.StudentUser, { foreignKey: 'student_user_idx', onDelete: 'CASCADE' });
    }
}

module.exports = StudentUserProgress;
