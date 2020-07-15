const express = require('express');
const { User, Course } = require('../db/index').models;
const asyncHandler = require('../middleware/asyncHandler');
const authenticateUser = require('../middleware/authenticateUser');
const router = express.Router();


// Returns a list of courses (including the user that own each course)
router.get('/courses', authenticateUser(User), asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    include: { model: User },
    attributes: {exclude: ['createdAt', 'updatedAt']},
  });
  res.json({ courses });
}));

// Creates a course, sets the location header to the URI for the course
router.post('/courses', authenticateUser(User), asyncHandler(async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res
      .set('Location', `/courses/${course.id}`)
      .status(201)
      .end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const message = error.errors.map(err => err.message);
      error.message = message;
      error.status = 400;
    }
    throw error;
  }
}));

// Returns a course (including the user that owns the course) for the provided course ID
router.get('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    include: { model: User },
    attributes: {exclude: ['createdAt', 'updatedAt']},
  });
  if (course) {
    res.json({ course });
  } else {
    res.status(404).json({message: 'Course not found'});
  }
}));

// Updates a course and returns no content
router.put('/courses/:id', authenticateUser(User), asyncHandler(async (req, res) => {
  const { currentUser } = req;
  const course = await Course.findByPk(req.params.id);
  
  if (course) {
    // If the course belongs to the authenticated user...
    if (course.userId === currentUser.id) {
      try {
        await course.update(req.body);
        res.status(204).end();
      } catch (error) {

        if (error.name === 'SequelizeValidationError') {
          const message = error.errors.map(err => err.message);
          error.message = message;
          error.status = 400;
        }
        throw error;
      }
    } else {
      res.status(403).json({message: 'User not authorized'});
    }
  } else {
    res.status(404).json({message: 'Course not found'});
  }
}));

// Deletes a course and returns no content
router.delete('/courses/:id', authenticateUser(User), asyncHandler(async (req, res) => {
  const { currentUser } = req;
  const course = await Course.findByPk(req.params.id);
  if (course) {
    // If the course belongs to the authenticated user...
    if (course.userId === currentUser.id) {
      await course.destroy();
      res.status(204).end();
    } else {
      res.status(403).json({message: 'User not authorized'});
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
}));

module.exports = router;