const express = require('express');
const router = express.Router();

// Returns the currently authenticated user - 200 status code.
router.get('/users', (req, res) => {
  res.json({message: "It's working"});
});

// Creates a user, sets the location header to "/", and returns no content.
router.post('/users', (req, res) => {
  res.json({message: "It's working"});
});

module.exports = router;