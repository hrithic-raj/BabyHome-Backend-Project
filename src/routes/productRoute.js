const express = require('express');
const { allProducts, productById, getNewlyAdded, getBestSellers } = require('../controllers/productController');
const productRouter = express.Router();

productRouter.get('/store', allProducts);

productRouter.get('/store/newlyadded', getNewlyAdded);

productRouter.get('/store/bestseller', getBestSellers);

productRouter.get('/store/product/:id', productById);

module.exports = productRouter;