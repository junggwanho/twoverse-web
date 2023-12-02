const Sequelize = require('sequelize');

class StudentUser extends Sequelize.Model {
    static initiate(sequelize) {
        StudentUser.init({
            idx: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id: {
                type: Sequelize.STRING(16),
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            check_code: {
                type: Sequelize.STRING(255),
                allowNull: true,
                references: {
                    model: 'User',
                    key: 'check_code',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'StudentUser',
            tableName: 'student_users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }); 
    }

    static associate(models) {
        StudentUser.belongsTo(models.User, { foreignKey: 'check_code' });
        StudentUser.hasOne(models.StudentUserScore, { foreignKey: 'student_user_idx', onDelete: 'CASCADE' });
        StudentUser.hasOne(models.StudentUserProgress, { foreignKey: 'student_user_idx', onDelete: 'CASCADE' });
        StudentUser.hasOne(models.Feedback, { foreignKey: 'student_user_idx', onDelete: 'CASCADE' });

        // 추가: ProcessQuizYN 모델과의 관계 설정
        StudentUser.hasOne(models.ProcessQuizYN, { foreignKey: 'student_user_idx', onDelete: 'CASCADE' });
    }
}

module.exports = StudentUser;
