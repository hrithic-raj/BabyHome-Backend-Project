const orderService = require('../services/orderService')

const createOrder = async (req, res)=>{
    try{
        const userId = req.id;
        const paymentMethod = req.body.paymentMethod;
        const addressId = req.params.addressId;
        if(!addressId) return res.status(400).json({message:" address not found "})
        // const method = paymentMethod.toString()
        const order = await orderService.createOrder(userId, paymentMethod, addressId);
        res.status(201).json({
            status:"success",
            message: "Order placed successfully",
            data: order
        });
    }catch(error){
        res.status(500).json({message: "Error placing order", error: error.message});
    }
}

const getOrdersById = async (req, res)=>{
    try{
        const userId = req.id;
        const order = await orderService.getOrdersById(userId)
        res.status(200).json({
            status:"success",
            data: order
        });
    }catch(error){
        res.status(500).json({message: "Error fetching orders", error: error.message});
    }
}
module.exports = {
    createOrder,
    getOrdersById,
}