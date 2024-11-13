const adminService = require('../services/adminService')

const getAllUsers = async (req, res)=>{
    const users = await adminService.getAllUsers();
    
    if(!users.length) return res.status(400).json({message:"bad request"});
    res.status(200).json({
        status : "fetching success", 
        data : users
    });
}

const getUserById = async (req, res)=>{
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    
    if(!user) return res.status(400).json({message:"bad request"});
    res.json({status : "fetching success", data : user});
}

module.exports = {
    getAllUsers,
    getUserById,
}