const express = require('express');

const app = express();

app.use(express.json());

const productsController = require('./controllers/productsController');

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);

module.exports = app;
