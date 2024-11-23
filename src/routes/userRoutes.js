const express = require('express');
const { allUsers, userById, signup, login, getUserFromToken } = require('../controllers/userControllers');
const userValidation = require('../validations/userValidation');
const auth = require('../middlewares/auth');
const userRouter = express.Router();

// userRouter.get('/admin/users', allUsers);
// userRouter.get('/admin/users/user/:id', userById);

userRouter.get('/', auth, getUserFromToken);
userRouter.post('/auth/signup',userValidation, signup);
userRouter.post('/auth/login', login);

module.exports = userRouter;