const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'fsjstd-restapi.db',
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

module.exports = db;