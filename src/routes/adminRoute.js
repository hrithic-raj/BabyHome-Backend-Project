const express = require('express');
const adminRouter = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const { getAllUsers, getUserById, deleteUserById, blockUserById } = require('../controllers/adminController');

adminRouter.get('/users', adminAuth, getAllUsers);
adminRouter.get('/user/:userId', adminAuth, getUserById);
adminRouter.delete('/user/:userId', adminAuth, deleteUserById);
adminRouter.patch('/user/:userId', adminAuth, blockUserById);

module.exports = adminRouter;