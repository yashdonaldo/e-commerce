const ErrorHandle = require('../utilis/errorHandaling')

module.exports = (err,req,res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    
    // Wrong Mongodb id error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandle(message, 400)
    }
    
    // Mongose duplicate key error
    if(err.code == 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} is Entered`
        err = new ErrorHandle(message, 400)
    }

    // Wrong JWT token error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is Invalid, Try Again`
        err = new ErrorHandle(message, 400)

    }

    // JWT  Expire error
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is Expire, Try Again`
        err = new ErrorHandle(message, 400)

    }
    res.status(err.statusCode).json({
        sucess: false,
        message: err.message
    })
}