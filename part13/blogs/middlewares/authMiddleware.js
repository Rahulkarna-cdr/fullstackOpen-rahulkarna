const jwt = require("jsonwebtoken")
const {SECRET_KEY} = require("../utils/config")

const tokenExtractor = (req,res,next)=>{
    const authHeader =  req.headers.authorization
    if(!authHeader){
        return res.status(400).json({err: "token missing"})
    }
    const token = authHeader.split(" ")[1]

    try{
    const decoded = jwt.verify(token,SECRET_KEY)
    req.user = decoded
    next()
    }
    catch(err){
        return res.status(401).json({err: "token Invalid or Expired"})
    }
}

module.exports = tokenExtractor