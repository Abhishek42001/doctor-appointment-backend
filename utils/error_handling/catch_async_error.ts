import express from 'express';
import { ExpressRequest } from '../types/common_types';


//TODO:understand this
export default (passedFunction:(req:ExpressRequest,response:express.Response,next:express.NextFunction)=>{})=>(req:ExpressRequest,res:express.Response,next:express.NextFunction)=>{
     Promise.resolve(passedFunction(req,res,next)).catch(next)
}

