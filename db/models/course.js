'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {};
  Course.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title field must have a value',
        }
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description field must have a value',
        }
      }
    },
    estimatedTime: {
      type: Sequelize.STRING,
    },
    materialsNeeded: {
      type: Sequelize.STRING
    }
  }, { sequelize });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  }

  return Course;
}