// const AppError = require('../utils/AppError')
require('dotenv').config({path:"../../.env"})

const globalErrorHandler = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development' ){
        res.status(err.statusCode).json({
            status : err.status,
            message : err.message,
            stack : err.stack,
            error : err,
        });
    }else if(process.env.NODE_ENV === 'production'){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.isOperational ? err.message : 'Something went wrong!',
        });
    }
};

module.exports = globalErrorHandler;