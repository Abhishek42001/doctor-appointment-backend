import express from 'express';
import Authenticator from '../../../../utils/authentication/authenticator';

const {APP_SECRET} =process.env;

 export default (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    return Authenticator(req,res,next,APP_SECRET??"");
}