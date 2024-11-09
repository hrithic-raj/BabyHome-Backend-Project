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

exports.getAddressById = async (userId) =>{
    const userAddress = await Address.find({userId});
    if(!userAddress) throw new Error('No address found');
    return userAddress;
}

exports.updateAddress = async (userId, addressId, addressData) =>{
    const address = await Address.findOne({userId})
    const addressIndex = address.allAddress.findIndex(item => item._id.equals(addressId))
    address.allAddress[addressIndex] = addressData;
    
    return await address.save();
}

exports.deleteAddress = async (userId, addressId) =>{
    let address = await Address.findOne({userId})
    const addressIndex = address.allAddress.findIndex(item => item._id.equals(addressId))
    address.allAddress.splice(addressIndex,1);
    return await address.save();
}
