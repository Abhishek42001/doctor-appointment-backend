import express from 'express';
import UserService from '../../services/user_service';
import UserAuth from '../middlewares/auth';
import UserEndPoints from '../../utils/endpoints/user_endpoints';
import CatchAsyncError from '../../../../utils/error_handling/catch_async_error';
import { ValidationError } from '../../../../utils/error_handling/app_error';
import { ExpressRequest } from '../../../../utils/types/common_types';

const UserApis=async(app:express.Express)=>{
    const service=new UserService();

    //get profile
    app.get(UserEndPoints.PROFILE,UserAuth,CatchAsyncError(async(req:ExpressRequest,res:express.Response,next:express.NextFunction)=>{
        const tokenPayload=req.user;
        const data=await service.GetProfile(tokenPayload._id)
        return res.status(200).json(data);
    }));

    //login user    
    app.post(UserEndPoints.SIGNIN,CatchAsyncError(async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
        const body=req.body;
        if(!Object.keys(body).length)throw new ValidationError();
        const data=await service.SignIn(body)
        return res.status(200).json(data);
    }))

    //register user
    app.post(UserEndPoints.SIGNUP,CatchAsyncError(async(req:express.Request,res:express.Response)=>{
        const body=req.body;
        if(!Object.keys(body).length)throw new ValidationError();
        const data=await service.SignUp(body);
        return res.status(201).json(data)
    }))
}

export default UserApis