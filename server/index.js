const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const SampleDb = require('./sample-db');

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
  () => {
    // const fakeDb = new FakeDb();
    // fakeDb.seeDb();
    const sampleDb = new SampleDb();
    sampleDb.initDb();
  }
);

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
