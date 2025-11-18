const jwt = require("jsonwebtoken")
const {SECRET_KEY} = require("../utils/config")
const {Session, User} = require("../models")

const tokenExtractor = async (req,res,next)=>{
    const authHeader =  req.headers.authorization
    if(!authHeader){
        return res.status(400).json({err: "token missing"})
    }
    const token = authHeader.split(" ")[1]

    try{
    const decoded = jwt.verify(token,SECRET_KEY)
    if(!decoded){
        return res.status(401).json({err: "token Invalid or Expired"})
    }
    
    const session = await Session.findOne({where:{token}})
    if(!session){
        return res.status(401).json({err: "Session not found or Expired"})
    }

    const user = await User.findByPk(decoded.id)
    if(!user || user.disabled){
        return res.status(403).json({err: "Account is disabled"})
    }
    
    req.user = decoded
    next()
}
    catch(err){
        return res.status(401).json({err: "token Invalid or Expired"})
    }
}

module.exports = tokenExtractor