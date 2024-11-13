

const allUsers = async (req, res)=>{
    const users = await userService.getAllUsers();
    
    if(!users.length) return res.status(400).json({message:"bad request"});
    res.json({status : "fetching success", data : users});
}

const userById = async (req, res)=>{
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    
    if(!user) return res.status(400).json({message:"bad request"});
    res.json({status : "fetching success", data : user});
}