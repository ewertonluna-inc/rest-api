const Sequelize = require('sequelize');

module.exports = () => {
  class Course extends Sequelize.Model {};
  Course.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    estimatedTime: {
      type: Sequelize.STRING,
    },
    materialsNeeded: {
      type: Sequelize.STRING
    }
  });

  Course.associate = (models) => {
    Course.belongsTo(models.Person);
  }

  return Course;
}