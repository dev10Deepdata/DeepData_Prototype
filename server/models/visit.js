const Sequelize = require('sequelize');

module.exports = class Visit extends Sequelize.Model {
  static initiate(sequelize) {
    Visit.init(
      {
        age: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },

        gender: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Visit',
        tableName: 'visits',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Visit.belongsToMany(db.Check, { through: 'Like', as: 'Likers' });
  }
};
