const express = require('express');
require('express-async-errors');
const routesProducts = require('./routes/routesProducts');
const routesSales = require('./routes/routesSales');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routesProducts);
app.use('/sales', routesSales);

app.use((err, _req, res, _next) =>
  res.status(err.code).json({ message: `${err.message}` }));

module.exports = app;
