const express = require('express');
const auth = require('../middlewares/auth');
const { addAddress, getAddressById, updateAddress, deleteAddress, getAllAddressById } = require('../controllers/addressController');
const addressRouter = express.Router();

addressRouter.post('/address', auth, addAddress);
addressRouter.get('/address', auth, getAllAddressById);
addressRouter.get('/address/:addressId', auth, getAddressById);
addressRouter.patch('/address/:addressId', auth, updateAddress);
addressRouter.delete('/address/:addressId', auth, deleteAddress);

module.exports = addressRouter;