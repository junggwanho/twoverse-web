const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
          id: {
            type: Sequelize.STRING(40),
            allowNull: false,
            unique: true,
          },
          nick: {
            type: Sequelize.STRING(15),
            allowNull: false,
            unique: true,
          },
          password: {
            type: Sequelize.STRING(16),
            allowNull: true,
          },
          phonenumber: {
            type: Sequelize.STRING(11),
            allowNull: false,
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
    
      static associate(db) {
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {
          foreignKey: 'followingId',
          as: 'Followers',
          through: 'Follow',
        });
        db.User.belongsToMany(db.User, {
          foreignKey: 'followerId',
          as: 'Followings',
          through: 'Follow',
        });
      }
    };
    
    module.exports = User;