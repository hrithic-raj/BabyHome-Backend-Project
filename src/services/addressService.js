const Address = require("../models/addressModel")
const mongoose = require('mongoose')

exports.addAddress = async (userId, newAddress)=>{
    let address = await Address.findOne({userId})
    if(!address){
        address = new Address({
            userId,
            allAddress: newAddress
        })
        return await address.save();
    }else{
        address.allAddress.push(newAddress);
        return await address.save();
    }
}

exports.getAllAddressById = async (userId) =>{
    const userAddress = await Address.findOne({userId});
    if(!userAddress) throw new Error('address not found');
    return userAddress.allAddress;
}

exports.getAddressById = async (userId, addressId) =>{
    const userAddress = await Address.findOne({userId});
    const addressIndex = userAddress.allAddress.findIndex(item => item._id.equals(addressId))
    if(!userAddress) throw new Error('address not found');
    if(addressIndex === -1) throw new Error('address not found');

    return userAddress.allAddress[addressIndex];
}

exports.updateAddress = async (userId, addressId, addressData) =>{
    const address = await Address.findOne({userId})
    const addressIndex = address.allAddress.findIndex(item => item._id.equals(addressId))
    if(addressIndex === -1) throw new Error('address not found');
    address.allAddress[addressIndex] = addressData;
    
    return await address.save();
}

exports.deleteAddress = async (userId, addressId) =>{
    let address = await Address.findOne({userId})
    const addressIndex = address.allAddress.findIndex(item => item._id.equals(addressId))
    if(addressIndex === -1) throw new Error('address not found');
    address.allAddress.splice(addressIndex, 1);
    return await address.save();
}
