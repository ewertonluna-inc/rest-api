const express = require('express');
const bcryptjs = require('bcryptjs');
const asyncHandler = require('../middleware/asyncHandler');
const { User } = require('../db/index').models;
const router = express.Router();


router.get('/users', asyncHandler((req, res) => {
  // Returns the currently authenticated user - 200 status code.
  const { firstName, lastName, emailAddres } = req.currentUser;
  res.json({
    firstName,
    lastName,
    emailAddres,
  });
}));

router.post('/users', asyncHandler(async (req, res, next) => {
  try {
    const user = req.body;
    const { password } = user;
    // If password is truthy, hash user password. Otherwise, do nothing to it.
    user.password = password ? bcryptjs.hashSync(user.password) : password;

    await User.create(user);
    res
      .set('Location', '/')
      .status(201)
      .end();
  } catch (error) {
    const message = [];
    // If validation fails (Sequelize level error)...
    if (error.name === 'SequelizeValidationError') {
      error.errors.map(err => message.push(err.message));
    
    // If emailAddress filed isn't unique (SQL level error)...
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      message.push("The provided email isn't unique");
    }

    if (message.length > 0) {
      error.message = message;
      error.status = 400;
    }
    throw error;
  }
}));

router.put('/users/:id', asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      const updatedFields = req.body;
      const { password } = updatedFields;
      // If password is truthy, hash user password. Otherwise, do nothing to it.
      updatedFields.password = password ? bcryptjs.hashSync(password) : password;
      
      await user.update(updatedFields);
      res.status(204).end();
    } else {
      res.status(404).json({message: 'User not found'});
    }

  } catch (error) {
    const message = [];
    // If validation fails (Sequelize level error)...
    if (error.name === 'SequelizeValidationError') {
      error.errors.map(err => message.push(err.message));
    
    // If emailAddress filed isn't unique (SQL level error)...
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      message.push("The provided email isn't unique");
    }

    if (message.length > 0) {
      error.message = message;
      error.status = 400;
    }
    throw error;
  }
}));

module.exports = router;