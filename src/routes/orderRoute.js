const express = require('express');
const auth = require('../middlewares/auth');
const orderRouter = express.Router();

orderRouter.post('/order', auth, orderController.createOrder);
orderRouter.get('/order', auth, orderController.getOrdersByUser);

module.exports = productRouter;