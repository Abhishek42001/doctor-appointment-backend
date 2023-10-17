import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../config';
import { JWTPayload } from './type_interfaces';


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

export const GenerateSignature=(payload:JWTPayload)=>{
    const token=jwt.sign(payload,APP_SECRET,{expiresIn:"1d"});
    return token;
}