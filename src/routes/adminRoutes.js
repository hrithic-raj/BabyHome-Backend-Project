const express = require('express');
const adminRouter = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const { getAllUsers, getUserById, deleteUserById, blockUserById, deleteProductById, addProduct, updateProductById, getAllOrders, getTotalRevenue, getSoldProductCount, getOrderCountById, adminGetOrdersById } = require('../controllers/adminControllers');
const { allProducts, productById } = require('../controllers/productControllers');
const productValidation = require('../validations/productValidation');

adminRouter.get('/users', adminAuth, getAllUsers);
adminRouter.get('/users/:userId', adminAuth, getUserById);
adminRouter.delete('/users/:userId', adminAuth, deleteUserById);
adminRouter.patch('/users/:userId', adminAuth, blockUserById);
adminRouter.get('/products', adminAuth, allProducts);
adminRouter.get('/products/:productId', adminAuth, productById);
adminRouter.post('/products', adminAuth, addProduct);
adminRouter.delete('/products/:productId', adminAuth, deleteProductById);
adminRouter.patch('/products/:productId', adminAuth, updateProductById);
adminRouter.get('/orders', adminAuth, getAllOrders);
adminRouter.get('/orders/:userId', adminAuth, adminGetOrdersById);
adminRouter.get('/total-revenue', adminAuth, getTotalRevenue);
adminRouter.get('/total-product-sold', adminAuth, getSoldProductCount);

module.exports = adminRouter;