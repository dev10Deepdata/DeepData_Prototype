const Sequelize = require('sequelize');
const Visit = require('./visit')
const Check = require('./check')

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

db.Visit = Visit;
db.Check = Check;

Visit.initiate(sequelize);
Check.initiate(sequelize);

Visit.associate(db);
Check.associate(db);


module.exports = db;
