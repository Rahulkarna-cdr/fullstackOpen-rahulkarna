const loginRouter = require('express').Router()
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const {SECRET_KEY} = require("../utils/config")

loginRouter.post("/",async(req,res)=>{
    const {username,password} = req.body
    const user = await User.findOne({where:{username}})
    if(!user){
        res.status(400).json({err: "user not found"})
    }

    if(user.password!==password){
        res.status(400).json({err: "Invalid credentials"})
    }

    const payload = {username:user.username,id:user.id}
    const token = jwt.sign(payload,SECRET_KEY)
    if(!token){
        res.status(400).json({err: "unable to create Token"})
    }
    
    res.status(200).json(token)
})

loginRouter.get("/",(req,res)=>{
    res.status(200).json({err:"welcome to the login page"})
})



module.exports=loginRouter