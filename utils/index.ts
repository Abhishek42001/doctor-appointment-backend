import {AuthorizeError} from './error_handling/app_error';
import jwt from 'jsonwebtoken'

export const ValidateSignature=(req:any,appSecret:string)=>{
    try {
        //TODO:fix, appsecret should be only one
        const signature=req.get("Authorization");
        if(!signature)throw new AuthorizeError("Signature not found")
        const payload= jwt.verify(signature,'SECRET')
        req.user=payload
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}
