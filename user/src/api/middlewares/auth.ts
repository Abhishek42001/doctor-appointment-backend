import {FormatError, ValidateSignature} from '../../utils';
import express from 'express';
import { NotFoundError } from '../../utils/error_handling/app_error';

export default (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    if(ValidateSignature(req)){
        next();
    }else{
        res.status(403).json(FormatError("Not Authorized"))
    }
}