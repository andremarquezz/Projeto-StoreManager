const express = require('express');
const validInfoSales = require('../middlewares/validInfoSales');
const SalesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', SalesController.getAll);

router.get('/:id', SalesController.getOne);

router.post('/', validInfoSales, SalesController.handleSaleProducts);
router.put('/:id', validInfoSales, SalesController.updateProduct);

router.delete('/:id', SalesController.deleteProduct);

module.exports = router;
