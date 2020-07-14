const express = require('express');
const bcryptjs = require('bcryptjs');
const asyncHandler = require('../middleware/asyncHandler');
const { User } = require('../db/index').models;
const router = express.Router();


router.get('/users', asyncHandler((req, res) => {
  // Returns the currently authenticated user - 200 status code.  
}));


router.post('/users', asyncHandler(async (req, res, next) => {
  try {
    const user = req.body;
    await User.create(user);
    res.status(201).json({user});
  } catch (error) {
    let errorMessages = [];

    // If validation fails (Sequelize level error)...
    if (error.name === 'SequelizeValidationError') {
      error.errors.map(err => errorMessages.push(err.message));
    
    // If emailAddress filed isn't unique (SQL level error)...
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      errorMessages.push("The provided email isn't unique");
    }

    if (errorMessages.length > 0) {
      res.status(400).json({errors: errorMessages});
    } else {
      throw error;
    }
  }
}));

module.exports = router;