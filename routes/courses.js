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

router.post('/courses', (req, res) => {
  // Creates a course, sets the location header to the URI for the course
})

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

router.put('/courses/:id', (req, res) => {
  // Updates a course and returns no content
});

router.delete('/courses/:id', (req, res) => {
  // Deletes a course and returns no content
});

module.exports = router;