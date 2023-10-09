import {createLogger,transports} from 'winston'
import express from 'express';
import { FormatError } from '..';
import { AuthorizeError, BaseError, NotFoundError, ValidationError } from './app_error';

const LogErrors=createLogger({
    transports:[
        new transports.Console(),
        new transports.File({filename:"app_error.log"})
    ]
})

class ErrorLogger{
    constructor(){}
    async logError(err:Error){
        console.log('==================== Start Error Logger ===============');
        LogErrors.log({
            private: true,
            level: 'error',
            message: `${new Date()}-${JSON.stringify(err.stack)}`
        });
        console.log('==================== End Error Logger ==============='); 
    }
}

const ErrorHandler=async(err:Error,req:express.Request,res:express.Response,next:express.NextFunction)=>{
    const errorLogger=new ErrorLogger();
    const isClientError=err instanceof ValidationError||err instanceof AuthorizeError|| err instanceof NotFoundError
    if(!isClientError){
       await errorLogger.logError(err)
    }
    console.log(err.stack)
    let statusCode=500
    let errorString="Internal Server Error"
    if(err instanceof BaseError){
        statusCode=err.statusCode;
        errorString=process.env.NODE_ENV=='dev'?(err.errorStack||err.description):'Internal server error'
    }
    res.status(statusCode).json(FormatError(errorString))
}

export default ErrorHandler;