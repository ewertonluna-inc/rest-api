const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'fsjstd-restapi.db',
});

const db = {
  sequelize,
  Sequelize,
  models: {}
}

const { models } = db;

models.User = require('./models/user')(sequelize);
models.Course = require('./models/course')(sequelize);

const { User, Course } = models;
User.associate(models);
Course.associate(models);

module.exports = db;