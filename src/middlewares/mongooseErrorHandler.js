const AppError = require("../utils/appError");


const mongooseErrorHandler = (err, req, res, next) =>{
    if(err.name === "ValidationError"){
        const message = Object.values(err.error).map(val=>val.message).join(', ');
        return next(new AppError(message, 400));
    }
    if(err.name === "MongoServerError" && err.code === 11000){
        console.log(JSON.stringify(err.keyvalue));
        
        const message = `Duplicate field values: ${JSON.stringify(err.keyvalue)} , change the value and try again! `;
        return next(new AppError(message, 400));
    }
    if(err.name === "CastError"){
        const message = `invalid ${err.path}: ${err.value}`;
        return next(new AppError(message, 400));
    }
    next(err);
}

module.exports = mongooseErrorHandler;