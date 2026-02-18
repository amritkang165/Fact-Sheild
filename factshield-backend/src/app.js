const express = require('express');
const cors = require('cors');

const checkRoutes = require('./routes/check.routes');
const historyRoutes = require('./routes/history.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/check', checkRoutes);
app.use('/api/history', historyRoutes);

module.exports = app;
