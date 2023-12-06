const Sequelize = require('sequelize');
 
class ProcessExplain extends Sequelize.Model {
    static initiate(sequelize) {
        ProcessExplain.init({
            idx: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            process: {
                type: Sequelize.STRING(16),
                allowNull: false,
            },
            Explain: {
                type: Sequelize.STRING(4000),
                allowNull: true,
            },
        }, {   
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'processExplain',
            tableName: 'process_Explain',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }); 
    }
}

module.exports = ProcessExplain;
