const express = require('express');
const { validNameRegister } = require('../middlewares/validRegisterProduct');
const ProductsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', ProductsController.getAll);

router.get('/search', ProductsController.productsIncludeTerm);

router.get('/:id', ProductsController.getOne);

router.post('/', validNameRegister, ProductsController.registerProduct);

router.put('/:id', validNameRegister, ProductsController.updateProduct);

router.delete('/:id', ProductsController.deleteProduct);

module.exports = router;