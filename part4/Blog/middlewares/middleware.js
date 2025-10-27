
const unknownEndPoint = async(req,res)=>{
    res.status(404).json({error: "unknown endpoint"})

}

const errorHandler = async(error,req,res,next)=>{

    if(error.name==="CastError"){
        return res.status(400).json({error: "Invalid ID Format"})
    }
    else if(error.name === "ValidationError"){
        return res.status(400).json({error: error.message})
    }
    else if(error.name==="MongoServerError" && error.code === 11000){    //error 11000 indicates the duplication key error
        return res.status(400).json({error: "Username must be unique"})
    }

    next(error)
}


module.exports = {unknownEndPoint, errorHandler}
