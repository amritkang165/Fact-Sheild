
const express = require('express');
const { checkNews } = require('../controllers/check.controller');

const router = express.Router();

// POST /api/check
router.post('/', checkNews);

module.exports = router;
