const express = require('express')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/userModel');
const { getAllUsers, getUserById, addUser } = require('../services/userService');
const tokenCreator = require('../utils/tokenCreator');

const signup = async (req, res)=>{
    try{
        const {name, email, username, password} = req.body;
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await addUser({name, email, username, password: hashedPass})
        res.status(201).json({message:"User registered", data: user});
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const login = async (req, res) =>{
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username});
        if(!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: 'Incorrect password' });

        const token = await tokenCreator(user.id);
        res.json({token});
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}

const allUsers = async (req, res)=>{
    const users = await getAllUsers();
    
    if(!users.length) return res.status(400).json({message:"bad request"});
    res.json({status : "fetching success", data : users});
}

const userById = async (req, res)=>{
    const userId = req.params.id;
    const user = await getUserById(userId);
    
    if(!user) return res.status(400).json({message:"bad request"});
    res.json({status : "fetching success", data : user});
}

module.exports = {
    signup,
    login,
    allUsers,
    userById,
}