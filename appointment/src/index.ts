import express from 'express';
import { databaseConnection } from './database';
import expressApp from './express_app';
import ErrorHandler from "../../utils/error_handling/error_handler";
import { PORT } from './config/index';
import { Appointment } from './api/controllers/';

const StartServer = async () => {
    const app = express();
    await databaseConnection();
    expressApp(app)
    await Appointment(app)
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        ErrorHandler(err, req, res, next)
    })

    app.listen(PORT, () => {
        console.log("listening to port", PORT)
    }).on('error', () => {
        console.log("error occured");
    })
}

StartServer()