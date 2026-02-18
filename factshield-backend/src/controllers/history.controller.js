const Check = require('../models/Check');

async function getHistory(req, res) {
  try {
    const limit = parseInt(req.query.limit || '20', 10);
    const checks = await Check.find().sort({ createdAt: -1 }).limit(limit);
    res.json(checks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getHistory };
