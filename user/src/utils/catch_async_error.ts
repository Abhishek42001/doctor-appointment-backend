import express from 'express';


//TODO:understand this
export default (passedFunction:(req:express.Request,response:express.Response,next:express.NextFunction)=>{})=>(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    return Promise.resolve(passedFunction(req,res,next)).catch(next)
}

