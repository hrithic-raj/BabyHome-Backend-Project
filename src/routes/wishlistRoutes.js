const express = require('express');
const { addToWishlist, getWishlistById, deleteFromWishlist } = require('../controllers/wishlistControllers');
const auth = require('../middlewares/auth');
const wishlistRouter = express.Router();

wishlistRouter.get('/', auth, getWishlistById);
wishlistRouter.post('/:productId', auth, addToWishlist);
wishlistRouter.delete('/:productId', auth, deleteFromWishlist);

module.exports = wishlistRouter;