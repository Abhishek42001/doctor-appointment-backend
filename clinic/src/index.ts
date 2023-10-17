import express from 'express';
import databaseConnection from './database/connection';
import expressApp from './express_app';
import ClinicController from './api/controllers/clinic_controller';
import ErrorHandler from "../../utils/error_handling/error_handler";
import { PORT } from "./config";

const StartServer = async () => {
    const app = express()
    await databaseConnection();
    expressApp(app)
    ClinicController(app)
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        ErrorHandler(err, req, res, next)
    })
    app.listen(PORT, () => {
        console.log("listening to port", PORT)
    }).on('error', () => {
        console.log("error occured");
    })
}

StartServer();