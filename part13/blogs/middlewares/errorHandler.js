 const errorHandler = (req,res,next,err)=>{
    console.error(err)

    if(err.name==="SequelizeValdiationError"){
        return res.json(500).json({err:err.message})
    }

    if(err.name==="SequelizeDatabaseError"){
        return res.status(500).json({err: err.msg})
    }

    res.status(500).json({err: err.msg})

 }


 module.exports = errorHandler