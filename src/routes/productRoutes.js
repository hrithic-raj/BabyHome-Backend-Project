const express = require('express');
const { allProducts, productById, getNewlyAdded, getBestSellers } = require('../controllers/productControllers');
const productRouter = express.Router();

productRouter.get('/', allProducts);

productRouter.get('/newlyadded', getNewlyAdded);

productRouter.get('/bestseller', getBestSellers);

productRouter.get('/:productId', productById);

module.exports = productRouter;