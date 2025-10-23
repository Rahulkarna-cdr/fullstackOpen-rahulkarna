const userRouter = require("express").Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')
const saltRounds = 10

userRouter.get("/",async (req,res)=>{
    const users = await User.find({})
    res.status(200).send(users)
})

userRouter.post("/", async (req,res)=>{
    const {username, name, password} = req.body
    const passwordHash = await bcrypt.hash(password,saltRounds)
    const user = {
        username,
        name,
        passwordHash
    }

    const newUser = new User(user)
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
})

module.exports = userRouter
