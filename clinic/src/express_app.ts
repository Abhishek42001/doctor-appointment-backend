import express from 'express';
import cors from 'cors'

export default (app:express.Express)=>{
    app.use(express.json())
    app.use(cors());
}