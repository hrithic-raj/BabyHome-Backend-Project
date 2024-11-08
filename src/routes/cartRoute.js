const express = require('express');
const auth = require('../middlewares/auth');
const { getCartById, addToCart, deleteCartItem, increaseCount, decreaseCount } = require('../controllers/cartController');
const cartRouter = express.Router();

cartRouter.get('/cart', auth, getCartById);

cartRouter.post('/store/product/:productId', auth, addToCart);

cartRouter.delete('/cart/:productId', auth, deleteCartItem);

cartRouter.patch('/cart/increase/:productId', auth, increaseCount);

cartRouter.patch('/cart/decrease/:productId', auth, decreaseCount);


module.exports = cartRouter;