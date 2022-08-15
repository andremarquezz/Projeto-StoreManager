const express = require('express');
const validInfoSales = require('../middlewares/validInfoSales');
const SalesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', SalesController.getAllSales);

router.get('/:id', SalesController.getOneSales);

router.post('/', validInfoSales, SalesController.handleSaleProducts);

module.exports = router;
