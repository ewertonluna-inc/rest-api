const express = require('express');
const router = express.Router();


router.get('/courses', (req, res) => {
  // Returns a list of courses (including the user that own each course)
})

router.post('/courses', (req, res) => {
  // Creates a course, sets the location header to the URI for the course
})

router.get('/courses/:id', (req, res) => {
  // Returns a course (including the user that owns the course) for the provided course ID
});

router.put('/courses/:id', (req, res) => {
  // Updates a course and returns no content
});

router.delete('/courses/:id', (req, res) => {
  // Deletes a course and returns no content
});

module.exports = router;