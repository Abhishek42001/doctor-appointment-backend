import express from 'express';
import cors from 'cors';
import ErrorHandler from './utils/error_handling/error_handler';

export default (app:express.Express)=>{
    app.use(express.json());
    app.use(cors());
}