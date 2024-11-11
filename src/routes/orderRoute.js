const express = require('express');
const auth = require('../middlewares/auth');
const { getOrdersById, createOrder } = require('../controllers/orderController');
const orderRouter = express.Router();

orderRouter.get('/', auth, getOrdersById);
orderRouter.post('/:addressId', auth, createOrder);

module.exports = orderRouter;