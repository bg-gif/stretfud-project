const express = require('express');
const cors = require('cors');
const app = express();
const apiRouter = require('./routers/api-router');

app.use('/', apiRouter);

module.exports = app;
