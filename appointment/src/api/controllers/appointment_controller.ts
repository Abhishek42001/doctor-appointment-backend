import express from 'express';
import auth from '../middlewares/auth';
import CatchAsyncError from '../../../../utils/error_handling/catch_async_error';
import { AppointmentService } from '../../services';
import {ExpressRequest} from '../../../../utils/types/common_types';
import AppointmentEndPoint from '../../utils/end_points/appointment_endpoint';
import { FormatData } from '../../../../utils/format_response';

export default async(app:express.Express)=>{
    const service=new AppointmentService();
    app.post(AppointmentEndPoint.APPOINTMENT,auth,CatchAsyncError(async(req:ExpressRequest,res:express.Response,next:express.NextFunction)=>{
        const body=req.body;
        const appointmentResponse=await service.CreateAppointment(body)
        res.status(201).json(appointmentResponse)
    }))

    app.patch(AppointmentEndPoint.APPOINTMENT,auth,CatchAsyncError(async(req:ExpressRequest,res:express.Response,next:express.NextFunction)=>{
        const body=req.body;
        const updatedAppointmentResponse=await service.UpdateAppointmentStatus(req.user._id,body.status)
        res.status(200).json(updatedAppointmentResponse);
    }))
}