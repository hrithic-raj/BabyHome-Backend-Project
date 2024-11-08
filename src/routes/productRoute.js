const express = require('express');
const { allProducts, productById, productByCategory } = require('../controllers/productController');
const productRouter = express.Router();

productRouter.get('/store', allProducts);

productRouter.get('/store/product/:id', productById);

module.exports = productRouter;