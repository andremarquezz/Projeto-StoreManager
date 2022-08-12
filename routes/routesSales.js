const express = require('express');
const validInfoSales = require('../middlewares/validInfoSales');
const SalesController = require('../controllers/salesController');

const router = express.Router();

router
  .route('/')
  .get(SalesController)
  .post(validInfoSales, SalesController.handleSaleProducts);

module.exports = router;
