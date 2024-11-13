const addressService = require('../services/addressService')
const catchAsync = require('../utils/asyncErrorHandler')

const addAddress = catchAsync(async (req, res, next) =>{
    const userId = req.id;
    const newAddress = req.body;    
    const address = await addressService.addAddress(userId, newAddress);
    res.status(201).json({
        status:"success",
        message:"address added successfully",
        data: address
    });
});

const getAllAddressById = catchAsync(async (req, res, next) =>{
    const userId = req.id;
    const allAddress = await addressService.getAllAddressById(userId);
    res.status(201).json({
        status:"success",
        data: allAddress
    });
});

const getAddressById = catchAsync(async (req, res, next) =>{
    const userId = req.id;
    const addressId = req.params.addressId;
    const address = await addressService.getAddressById(userId, addressId);
    res.status(200).json({
        status:"success",
        data: address
    });
});

const updateAddress = catchAsync(async (req, res, next) =>{
    const userId = req.id;
    const addressId = req.params.addressId;
    const addressData = req.body;
    const updatedAddress = await addressService.updateAddress(userId, addressId, addressData);
    res.json(updatedAddress);
});

const deleteAddress = catchAsync(async (req, res, next) =>{
    const userId = req.id;
    const addressId = req.params.addressId;
    const address = await addressService.deleteAddress(userId, addressId);
    res.json(address);
});

module.exports = {
    addAddress,
    getAddressById,
    updateAddress,
    deleteAddress,
    getAllAddressById,
}