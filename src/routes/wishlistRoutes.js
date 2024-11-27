const express = require('express');
const { addToWishlist, getWishlistById, deleteFromWishlist, checkWishlistById } = require('../controllers/wishlistControllers');
const auth = require('../middlewares/auth');
const wishlistRouter = express.Router();

wishlistRouter.get('/', auth, getWishlistById);
wishlistRouter.get('/check/:productId', auth, checkWishlistById);
wishlistRouter.post('/:productId', auth, addToWishlist);
wishlistRouter.delete('/:productId', auth, deleteFromWishlist);

module.exports = wishlistRouter;