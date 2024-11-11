const express = require('express');
const { allProducts, productById, getNewlyAdded, getBestSellers } = require('../controllers/productController');
const productRouter = express.Router();

productRouter.get('/', allProducts);

productRouter.get('/newlyadded', getNewlyAdded);

productRouter.get('/bestseller', getBestSellers);

productRouter.get('/product/:id', productById);

module.exports = productRouter;