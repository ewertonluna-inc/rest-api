const express = require('express');
const { User, Course } = require('../db/index').models;
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();


router.get('/courses', asyncHandler(async (req, res) => {
  // Returns a list of courses (including the user that own each course)
  const courses = await Course.findAll({
    include: { model: User }
  });
  res.json({courses});
}));

router.post('/courses', asyncHandler(async (req, res) => {
  // Creates a course, sets the location header to the URI for the course
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

router.get('/courses/:id', asyncHandler(async (req, res) => {
  // Returns a course (including the user that owns the course) for the provided course ID
  const course = await Course.findByPk(req.params.id, {
    include: { model: User }
  });
  if (course) {
    res.json({ course });
  } else {
    res.status(404).json({message: 'Course not found'});
  }
}));

router.put('/courses/:id', asyncHandler(async (req, res) => {
  // Updates a course and returns no content
  const course = await Course.findByPk(req.params.id);
  if (course) {
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
    res.status(404).json({message: 'Course not found'});
  }
}));

router.delete('/courses/:id', asyncHandler(async (req, res) => {
  // Deletes a course and returns no content
  const course = await Course.findByPk(req.params.id);
  if (course) {
    await course.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
}));

module.exports = router;