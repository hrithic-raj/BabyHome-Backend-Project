const express = require('express');
const auth = require('../middlewares/auth');
const { getOrdersById, createOrder } = require('../controllers/orderController');
const orderRouter = express.Router();

orderRouter.post('/orders/:addressId', auth, createOrder);
orderRouter.get('/orders', auth, getOrdersById);

module.exports = orderRouter;