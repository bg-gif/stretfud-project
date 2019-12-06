const express = require('express');
const cors = require('cors');
const app = express();

app.use('/', () => {
  console.log('Helloworld');
});

module.exports = app;
