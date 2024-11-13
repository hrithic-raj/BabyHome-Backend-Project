const orderService = require('../services/orderService')

const createOrder = async (req, res)=>{
    try{
        const userId = req.id;
        const paymentMethod = req.body.paymentMethod;
        const addressId = req.params.addressId
        
        // const method = paymentMethod.toString()
        const order = await orderService.createOrder(userId, paymentMethod, addressId)
        res.json({message: "Order placed successfully", order});
    }catch(error){
        res.status(500).json({message: "Error placing order", error: error.message});
    }
}

const getOrdersById = async (req, res)=>{
    try{
        const userId = req.id;
        const order = await orderService.getOrdersById(userId)
        res.json(order);
    }catch(error){
        res.status(500).json({message: "Error fetching orders", error: error.message});
    }
}
module.exports = {
    createOrder,
    getOrdersById,
}