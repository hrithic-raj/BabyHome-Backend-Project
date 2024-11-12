const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    allAddress:[{
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: Number, required: true },
        country: { type: String, required: true },
        phone: { type: Number, required: true}
    }],
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;