const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose');
const config = require('./config/dev');

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.get('/products', function (req, response) {
  response.json(
    {
      'success': true,
      'temp': 'hello'
    });
});

const PORT = process.env.PORT || '3001';

app.listen('3001', function () {
  console.log('running')
});
