const express = require('express');
const auth = require('../middlewares/auth');
const { addAddress, getAddressById, updateAddress, deleteAddress } = require('../controllers/addressController');
const addressRouter = express.Router();

addressRouter.post('/address', auth, addAddress);
addressRouter.get('/address', auth, getAddressById);
addressRouter.patch('/address/:addressId', auth, updateAddress);
addressRouter.delete('/address/:addressId', auth, deleteAddress);

module.exports = addressRouter;