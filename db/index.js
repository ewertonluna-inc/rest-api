const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'fsjstd-restapi.db',
});

// const User = require('./models/user')(sequelize);
// const Course = require('./models/course')(sequelize);

// const models = { User, Course };
// User.associate(models);
// Course.associate(models);

const db = {
  sequelize,
  Sequelize,
  models: {}
}

module.exports = db;