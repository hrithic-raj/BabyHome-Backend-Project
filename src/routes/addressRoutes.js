const express = require('express');
const auth = require('../middlewares/auth');
const { addAddress, getAddressById, updateAddress, deleteAddress, getAllAddressById, setPrimaryAddress } = require('../controllers/addressControllers');
const addressValidation = require('../validations/addressValidation');
const addressRouter = express.Router();

addressRouter.post('/', auth, addressValidation, addAddress);
addressRouter.get('/', auth, getAllAddressById);
addressRouter.get('/:addressId', auth, getAddressById);
addressRouter.put('/:addressId', auth, updateAddress);
addressRouter.delete('/:addressId', auth, deleteAddress);
addressRouter.put('/primary/:addressId', auth, setPrimaryAddress);

module.exports = addressRouter;