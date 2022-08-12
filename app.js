const express = require('express');
require('express-async-errors');
const routesProducts = require('./routes/routesProducts');

const app = express();

app.use(express.json());

const salesController = require('./controllers/salesController');

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routesProducts);
app.use('/sales', salesController);

app.use((err, _req, res, _next) => {
  res.status(err.code).json({ message: `${err.message}` });
});

module.exports = app;
