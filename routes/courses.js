const express = require('express');
const router = express.Router();


router.get('/courses', (req, res) => {
  res.json({ message: 'Im inside courses routes' })
})

router.post('/courses', (req, res) => {
  res.json({ message: 'Im inside courses routes' })
})

router.get('/courses/:id', (req, res) => {
  res.json({ message: 'Im inside courses routes' })
});

router.put('/courses/:id', (req, res) => {
  res.json({ message: 'Im inside courses routes' })
});

router.delete('/courses/:id', (req, res) => {
  res.json({ message: 'Im inside courses routes' })
});

module.exports = router;