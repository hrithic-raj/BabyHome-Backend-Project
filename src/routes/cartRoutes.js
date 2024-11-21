const express = require('express');
const auth = require('../middlewares/auth');
const { getCartById, addToCart, deleteCartItem, increaseCount, decreaseCount } = require('../controllers/cartControllers');
const cartRouter = express.Router();

cartRouter.get('/', auth, getCartById);

cartRouter.post('/:productId', auth, addToCart);

cartRouter.delete('/:productId', auth, deleteCartItem);

cartRouter.patch('/increase/:productId', auth, increaseCount);

cartRouter.patch('/decrease/:productId', auth, decreaseCount);


module.exports = cartRouter;