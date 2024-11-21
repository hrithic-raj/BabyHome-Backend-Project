const express = require('express');
const { allUsers, userById, signup, login } = require('../controllers/userControllers');
const userValidation = require('../validations/userValidation');
const userRouter = express.Router();

// userRouter.get('/admin/users', allUsers);
// userRouter.get('/admin/users/user/:id', userById);

userRouter.post('/signup',userValidation, signup);
userRouter.post('/login', login);


module.exports = userRouter;