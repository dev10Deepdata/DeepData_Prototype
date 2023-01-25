const Sequelize = require('sequelize');

module.exports = class Check extends Sequelize.Model {
  static initiate(sequelize) {
    Check.init(
      {
        do: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        si: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        company: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        product: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Check',
        tableName: 'checks',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Check.belongsToMany(db.Visit, { through: 'Like', as: 'Liked' });
  }
};
