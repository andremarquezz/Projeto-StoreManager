const express = require('express');
require('express-async-errors');

const app = express();

app.use(express.json());

const productsController = require('./controllers/productsController');

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);

app.use((err, _req, res, _next) => {
  res.status(err.code).json({ message: `${err.message}` });
});

module.exports = app;
