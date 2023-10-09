import express from "express";
import databaseConnection from './database'
import { User } from "./api";
import { PORT } from "./config";
import intialiseExpressApp from "./express_app";
import ErrorHandler from "./utils/error_handling/error_handler";


//add validator
const StartServer=async ()=>{

    const app:express.Express=express();
    await databaseConnection()
    intialiseExpressApp(app);
    await User(app)
    app.use(async (err:Error,req:express.Request,res:express.Response,next:express.NextFunction)=>{
        await ErrorHandler(err,req,res,next)
    })
    app.listen(PORT,()=>{
        console.log("listening to port",PORT)
    }).on('error',()=>{
        console.log("error occured");
        // process.exit();
    })

}

StartServer();