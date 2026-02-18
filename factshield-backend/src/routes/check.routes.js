const express = require('express');
const router = express.Router();
const { checkNews } = require('../controllers/check.controller');


router.get('/news', (req, res) => {
  res.json({ message: "This is your /news endpoint. Use POST with JSON to check news." });
});
router.post('/news', checkNews);

module.exports = router;
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});
