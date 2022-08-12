const express = require('express');
const validInfoSales = require('../middlewares/validInfoSales');
const SalesService = require('../services/salesService');

const router = express.Router();

router
  .route('/')
  .get((_req, res) => {
    res.status(200).json({ message: 'ok' });
  })
  .post(validInfoSales, async (req, res) => {
    const response = SalesService.handleSaleProducts(req.body);
    res.status(201).json(response);
  });

module.exports = router;
