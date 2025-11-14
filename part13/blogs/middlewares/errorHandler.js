 const errorHandler = (err,req,res,next)=>{
    console.error(err)

    if(err.name==="SequelizeValidiationError"){
        return res.status(400).json({err: err.errors[0].message})
    }

    if(err.name==="SequelizeDatabaseError"){
        return res.status(500).json({err: err.message})
    }

    res.status(500).json({err: err.message || "Internal Server Error"})

 }


 module.exports = errorHandler