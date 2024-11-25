const Address = require("../models/addressModel")
const mongoose = require('mongoose');
const AppError = require("../utils/appError");

exports.addAddress = async (userId, newAddress)=>{
    if(!newAddress) throw new AppError("Add address and try again", 400);
    newAddress.phone = Number(newAddress.phone);
    if (!newAddress.phone) {
        throw new AppError('Phone number is required and cannot be null.', 400);
    }
    let address = await Address.findOne({userId});
    
    if(!address){
        address = new Address({
            userId,
            allAddress: [newAddress]
        })
        return await address.save();
    }else{
        address.allAddress.push(newAddress);
        return await address.save();
    }
}

exports.getAllAddressById = async (userId) =>{
    const userAddress = await Address.findOne({userId});
    if(!userAddress) throw new AppError('address not found', 404);
    return userAddress.allAddress;
}

exports.getPrimaryAddress = async (userId) =>{
    const userAddress = await Address.findOne({userId});
    console.log(userAddress);
    
    if(!userAddress) throw new AppError('address not rfgvrv', 404);
    const addressIndex = userAddress.allAddress.findIndex(item => item.isSelected === true)
    
    if(addressIndex === -1) {
        if(!userAddress.allAddress[0]) throw new AppError('no address found', 404);
        return userAddress.allAddress[0];
    }
    return userAddress.allAddress[addressIndex];
}

exports.getAddressById= async (userId, addressId) =>{
    const userAddress = await Address.findOne({userId});
    if(!userAddress) throw new AppError('address not found', 404);
    const addressIndex = userAddress.allAddress.findIndex(item => item._id.equals(addressId))
    
    if(addressIndex === -1) throw new AppError('address not found', 404);
    
    return userAddress.allAddress[addressIndex];
}

exports.updateAddress = async (userId, addressId, addressData) =>{
    const address = await Address.findOneAndUpdate(
        {'allAddress._id': addressId},
        {$set: { 'allAddress.$': addressData}},
        {new: true}
    );
    return address;
}
exports.setPrimaryAddress = async (userId, addressId) =>{
    const userAddress = await Address.findOne({userId});
    userAddress.allAddress.forEach( addr => {
        addr.isSelected = addr._id.toString() ===  addressId;
    });
    return await userAddress.save();
}

exports.deleteAddress = async (userId, addressId) =>{
    let address = await Address.findOne({userId})
    const addressIndex = address.allAddress.findIndex(item => item._id.equals(addressId))
    if(addressIndex === -1) throw new AppError('address not found', 404);
    address.allAddress.splice(addressIndex, 1);
    return await address.save();
}