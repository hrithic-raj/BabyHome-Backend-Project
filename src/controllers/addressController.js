const addressService = require('../services/addressService')

const addAddress = async (req, res) =>{
    try{
        const {userId} = req.userId;
        const newAddress = req.body;
        // console.log(newAddress);
        const address = await addressService.addAddress(userId, newAddress);
        res.json(address);
    } catch (error) {
        res.status(500).json({ message: "Error adding address", error: error.message });
    }
}

const getAllAddressById = async (req, res) =>{
    try{
        const {userId} = req.userId;
        const allAddress = await addressService.getAllAddressById(userId);
        res.json(allAddress);
    }catch(error){
        res.status(500).json({ message: "Error getting address", error: error.message });
    }
}
const getAddressById = async (req, res) =>{
    try{
        const {userId} = req.userId;
        const addressId = req.params.addressId;
        const address = await addressService.getAddressById(userId, addressId);
        res.json(address);
    }catch(error){
        res.status(500).json({ message: "Error getting address", error: error.message });
    }
}
const updateAddress = async (req, res) =>{
    try{
        const {userId} = req.userId;
        const addressId = req.params.addressId;
        const addressData = req.body;
        const updatedAddress = await addressService.updateAddress(userId, addressId, addressData);
        res.json(updatedAddress);
    }catch(error){
        res.status(500).json({ message: "Error updating address", error: error.message });
    }
}

const deleteAddress = async (req, res) =>{
    try{
        const {userId} = req.userId;
        const addressId = req.params.addressId;
        const address = await addressService.deleteAddress(userId, addressId);
        res.json(address);
    }catch(error){
        res.status(500).json({ message: "Error deleting address", error: error.message });
    }
}
module.exports = {
    addAddress,
    getAddressById,
    updateAddress,
    deleteAddress,
    getAllAddressById,
}