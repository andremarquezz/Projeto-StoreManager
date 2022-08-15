const express = require('express');
const { validNameRegister } = require('../middlewares/validRegisterProduct');
const ProductsController = require('../controllers/productsController');
// const validInfoSales = require('../middlewares/validInfoSales');

const router = express.Router();

router.get('/', ProductsController.getAll);

router.get('/:id', ProductsController.getOne);

router.post('/', validNameRegister, ProductsController.registerProduct);

router.put('/:id', validNameRegister, ProductsController.updateProduct);

module.exports = router;
