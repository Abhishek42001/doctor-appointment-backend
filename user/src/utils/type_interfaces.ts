import express from 'express'

export  interface UserInterFace{
    email:string,
    name:string,
    password:string,
    role:string,
    salt:string,
    is_deleted:boolean
}
export interface LoginInterface{
    email:string,
    password:string
}

export interface JWTPayload{
    email:string,
    _id:string
}

