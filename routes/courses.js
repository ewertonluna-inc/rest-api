const express = require('express');
const router = express.Router();

router.get('/courses', (req, res) => {
  res.json({message: 'Im inside courses routes'})
})


router.post('/courses', (req, res) => {
  res.json({message: 'Im inside courses routes'})
})

module.exports = router;