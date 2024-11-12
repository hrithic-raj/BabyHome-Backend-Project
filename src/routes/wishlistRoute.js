const express = require('express');
const { addToWishlist, getWishlistById, deleteFromWishlist } = require('../controllers/wishlistController');
const auth = require('../middlewares/auth');
const wishlistRouter = express.Router();

wishlistRouter.post('/wishlist/:productId', auth, addToWishlist);
wishlistRouter.delete('/wishlist/:productId', auth, deleteFromWishlist);
wishlistRouter.get('/wishlist', auth, getWishlistById);

module.exports = wishlistRouter;