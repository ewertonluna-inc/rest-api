'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {};
  User.init({
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First name field must have a value',
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last name field must have a value',
        }
      }
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email field must have a value',
        },
        isEmail: {
          msg: 'Email field must have a valid format',
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password field must have a value',
        }
      }
    }
  }, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: 'userId',
      as: 'courseUser',
    })
  }

  return User;
}