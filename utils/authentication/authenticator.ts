import { ValidateSignature} from '..';
import express from 'express';
import {FormatError} from '../format_response';

export default (req:express.Request,res:express.Response,next:express.NextFunction,appSecret:string)=>{
    if(ValidateSignature(req,appSecret)){
        next();
    }else{
        res.status(403).json(FormatError("Not Authorized"))
    }
}