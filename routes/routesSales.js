const express = require('express');
const validInfoSales = require('../middlewares/validInfoSales');
const SalesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json({ message: 'rota sales OK' });
});

router.post('/', validInfoSales, SalesController.handleSaleProducts);

module.exports = router;
