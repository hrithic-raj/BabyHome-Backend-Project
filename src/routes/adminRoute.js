const express = require('express');
const adminRouter = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const { getAllUsers, getUserById, deleteUserById, blockUserById, deleteProductById, addProduct, updateProductById, getAllOrders, getTotalRevenue, getSoldProductCount } = require('../controllers/adminController');
const { allProducts, productById } = require('../controllers/productController');
const productValidation = require('../validations/productValidation');

adminRouter.get('/users', adminAuth, getAllUsers);
adminRouter.get('/user/:userId', adminAuth, getUserById);
adminRouter.delete('/user/:userId', adminAuth, deleteUserById);
adminRouter.patch('/user/:userId', adminAuth, blockUserById);
adminRouter.get('/products', adminAuth, allProducts);
adminRouter.get('/products/:productId', adminAuth, productById);
adminRouter.post('/products', adminAuth, productValidation, addProduct);
adminRouter.delete('/products/:productId', adminAuth, deleteProductById);
adminRouter.patch('/products/:productId', adminAuth, updateProductById);
adminRouter.get('/orders', adminAuth, getAllOrders);
adminRouter.get('/totalRevenue', adminAuth, getTotalRevenue);
adminRouter.get('/totalProductSold', adminAuth, getSoldProductCount);

module.exports = adminRouter;  