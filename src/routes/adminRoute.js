const express = require('express');
const adminRouter = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const { getAllUsers, getUserById, deleteUserById, blockUserById } = require('../controllers/adminController');
const { allProducts, productById } = require('../controllers/productController');

adminRouter.get('/users', adminAuth, getAllUsers);
adminRouter.get('/user/:userId', adminAuth, getUserById);
adminRouter.delete('/user/:userId', adminAuth, deleteUserById);
adminRouter.patch('/user/:userId', adminAuth, blockUserById);
adminRouter.get('/products', adminAuth, allProducts);
adminRouter.get('/product/:productId', adminAuth, productById);
adminRouter.post('/products', adminAuth, productById);
adminRouter.delete('/products/:productId', adminAuth, productById);
adminRouter.patch('/products/:productId', adminAuth, productById);

module.exports = adminRouter;