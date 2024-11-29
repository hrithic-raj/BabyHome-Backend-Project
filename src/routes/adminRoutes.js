const express = require('express');
const adminRouter = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const { getAllUsers, getUserById, deleteUserById, blockUserById, deleteProductById, addProduct, updateProductById, getAllOrders, getTotalRevenue, getSoldProductCount, getOrderCountById, adminGetOrdersById, getAdminFromToken } = require('../controllers/adminControllers');
const { allProducts, productById } = require('../controllers/productControllers');
const productValidation = require('../validations/productValidation');
const upload = require('../config/multerConfig');


adminRouter.get('/users', adminAuth, getAllUsers);
adminRouter.get('/users/:userId', adminAuth, getUserById);
adminRouter.delete('/users/:userId', adminAuth, deleteUserById);
adminRouter.patch('/users/:userId', adminAuth, blockUserById);
adminRouter.get('/products', adminAuth, allProducts);
adminRouter.get('/products/:productId', adminAuth, productById);
adminRouter.post('/products', adminAuth, addProduct);
// adminRouter.post('/products', adminAuth, upload.array('images', 10), addProduct);
adminRouter.delete('/products/:productId', adminAuth, deleteProductById);
adminRouter.patch('/products/:productId', adminAuth, updateProductById);
adminRouter.get('/orders', adminAuth, getAllOrders);
adminRouter.get('/orders/:userId', adminAuth, adminGetOrdersById);
adminRouter.get('/total-revenue', adminAuth, getTotalRevenue);
adminRouter.get('/total-product-sold', adminAuth, getSoldProductCount);
adminRouter.get('/admin-details', adminAuth, getAdminFromToken);

module.exports = adminRouter;