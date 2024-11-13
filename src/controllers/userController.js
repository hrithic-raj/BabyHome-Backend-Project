const userService = require('../services/userService');
const hashingPassword = require('../utils/hashingPassword');
const tokenCreator = require('../utils/tokenCreator');

const signup = async (req, res)=>{
    try{
        const {name, email, username, password, role} = req.body;
        const hashedPass = await hashingPassword.hash(password);
        const user = await userService.addUser({name, email, username, password: hashedPass, role}) 
        res.status(201).json({
            status: "success",
            message: "User registered",
            data: user
        });
    }catch(error){
        res.status(500).json({
            message:"error while register user",
            error: error.message
        })
    }
}

const login = async (req, res) =>{
    const {username, password} = req.body;
    try{
        const user = await userService.getUserByUsername(username);
        if(!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await hashingPassword.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: 'Incorrect password' });
        
        const token = await tokenCreator(user.id, user.role);
        res.status(200).json({
            status:"success",
            message: "User login successfull",
            token,
        });
    }catch(error){
        res.status(500).json({
            message:"error while login user", 
            error: error.message 
        });
    }
}

module.exports = {
    signup,
    login,
}