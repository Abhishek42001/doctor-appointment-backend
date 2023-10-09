import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../config';
import { JWTPayload } from './type_interfaces';
import { AuthorizeError } from './error_handling/app_error';


//Generate salt
export const GenerateSalt=async()=>{
    return bcrypt.genSalt();
}

//Generate Hashed Password
export const GenerateHashedPassowrd=async(password:string,salt:string)=>{
    return bcrypt.hash(password,salt)
}

//Validate password
export const ValidatePassowrd=async(enteredPassword:string,savedPassword:string,salt:string)=>{
    return (await GenerateHashedPassowrd(enteredPassword,salt))==savedPassword
}

export const FormatData=(data:any)=>{
    if(data){
        if(data.success){
            return data;
        }
        return {data,success:true};
    }
    throw new Error("Data not found");
}

export const FormatError=(message:any)=>{
    return {message,success:false};
    
}


export const ValidateSignature=(req:any)=>{
    try {
        const signature=req.get("Authorization");
        if(!signature)throw new AuthorizeError("Signature not found")
        const payload= jwt.verify(signature.split(" ")[1],APP_SECRET)
        req.user=payload
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export const GenerateSignature=(payload:JWTPayload)=>{
    const token=jwt.sign(payload,APP_SECRET,{expiresIn:"1d"});
    return token;
}