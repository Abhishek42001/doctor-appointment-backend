import express from 'express';
import UserService from '../../services/user_service';
import UserAuth from '../middlewares/auth';
import CatchAsyncError from '../../utils/catch_async_error';
import { FormatData } from '../../utils';
import { ValidationError } from '../../utils/error_handling/app_error';
import { ExpressRequest } from '../../utils/type_interfaces';

const UserApis=async(app:express.Express)=>{
    const service=new UserService();

    //get profile
    app.get('/profile',UserAuth,CatchAsyncError(async(req:ExpressRequest,res:express.Response,next:express.NextFunction)=>{
        const tokenPayload=req.user;
        const data=await service.GetProfile(tokenPayload._id)
        return res.status(200).json(FormatData(data));
    }));

    //login user    
    app.post("/signin",CatchAsyncError(async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
        const body=req.body;
        if(!Object.keys(body).length)throw new ValidationError();
        const data=await service.SignIn(body)
        return res.status(200).json(FormatData(data));
    }))

    //register user
    app.post("/signup",CatchAsyncError(async(req:express.Request,res:express.Response)=>{
        const body=req.body;
        if(!Object.keys(body).length)throw new ValidationError();
        const data=await service.SignUp(body);
        return res.status(200).json(FormatData(data))
    }))
}

export default UserApis