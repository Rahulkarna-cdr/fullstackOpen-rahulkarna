const userRouter = require("express").Router()

const {User, Blog} = require("../models")

userRouter.get("/",async (req,res)=>{
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ["user_id"] }
        }
    });
    res.status(200).json(users)

})

userRouter.post("/",async(req,res)=>{
    const {name,username,password} = req.body
    if(!name||!username||!password){
        return res.status(400).json({error: "all fields must be provided"})
    }
    const user = User.build({
        name,
        username,
        password
    })
    await user.save()
    res.status(201).json({msg: "User created Successfully", user})
})



userRouter.put("/:username", async(req,res)=>{
    const username = req.params.username
    const user = await User.findOne({where:{username}})
    if(!user){
        return res.status(404).json({error: "error not found"})
    }
    const existingUser = await User.findOne({where:{username:req.body.username}})
    if(existingUser){
        return res.status(400).json({error: "username is already taken"})
    }

    user.username = req.body.username
    await user.save()
    res.status(200).json({msg:"Sucessfully updated the username", user})
})


module.exports = userRouter