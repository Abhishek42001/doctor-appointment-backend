import express from 'express';

export interface ExpressRequest extends express.Request{
    user:{
        email:string,
        _id:string
    }
}