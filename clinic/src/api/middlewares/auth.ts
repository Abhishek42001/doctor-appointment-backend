import express from 'express'
import Authenticator from '../../../../utils/authentication/authenticator';
import { APP_SECRET } from '../../config';

export default (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    Authenticator(req,res,next,APP_SECRET)
}