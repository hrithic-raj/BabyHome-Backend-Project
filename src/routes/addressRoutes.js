const express = require('express');
const auth = require('../middlewares/auth');
const { addAddress, getAddressById, updateAddress, deleteAddress, getAllAddressById } = require('../controllers/addressControllers');
const addressValidation = require('../validations/addressValidation');
const addressRouter = express.Router();

addressRouter.post('/', auth, addressValidation, addAddress);
addressRouter.get('/', auth, getAllAddressById);
addressRouter.get('/:addressId', auth, getAddressById);
addressRouter.patch('/:addressId', auth, addressValidation, updateAddress);
addressRouter.delete('/:addressId', auth, deleteAddress);

module.exports = addressRouter;