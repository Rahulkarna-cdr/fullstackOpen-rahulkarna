 const errorHandler = (err,req,res,next)=>{
    console.error(err)

    if(err.name==="SequelizeValdiationError"){
        return res.json(400).json({err:err.message})
    }

    if(err.name==="SequelizeDatabaseError"){
        return res.status(500).json({err: err.message})
    }

    res.status(500).json({err: err.message || "Internal Server Error"})

 }


 module.exports = errorHandler