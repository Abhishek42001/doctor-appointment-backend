import express from 'express';
import auth from '../middlewares/auth';
import CatchAsyncError from '../../../../utils/error_handling/catch_async_error';
import { AppointmentService } from '../../services';
import {ExpressRequest} from '../../../../utils/types/common_types';
import AppointmentEndPoint from '../../utils/end_points/appointment_endpoint';

export default async(app:express.Express)=>{
    const service=new AppointmentService();
    app.post(AppointmentEndPoint.APPOINTMENT,auth,CatchAsyncError(async(req:ExpressRequest,res:express.Response,next:express.NextFunction)=>{
        const body=req.body;
        const id=req.user._id
        const appointmentResponse=await service.CreateAppointment(body,id)
        res.status(201).json(appointmentResponse)
    }))

    app.patch(AppointmentEndPoint.APPOINTMENT,auth,CatchAsyncError(async(req:ExpressRequest,res:express.Response,next:express.NextFunction)=>{
        const body=req.body;
        const updatedAppointmentResponse=await service.UpdateAppointmentStatus(req.user._id,body.status)
        res.status(200).json(updatedAppointmentResponse);
    }))

    app.get(AppointmentEndPoint.GETALLAPPOINTMENTBYPATIENTID,auth,CatchAsyncError(async(req:ExpressRequest,res:express.Response,next:express.NextFunction)=>{
        const  customerId=req.user._id
        const appointmentsResponse=await service.GetAllAppointmentsOfCustomer(customerId)
        res.status(200).json(appointmentsResponse)
    }))
    app.get(AppointmentEndPoint.GETALLAPPOINTMENTBYDOCTORD,auth,CatchAsyncError(async(req:ExpressRequest,res:express.Response,next:express.NextFunction)=>{
        const  doctorId=req.user._id
        const appointmentsResponse=await service.GetAllAppointmentsOfDoctor(doctorId)
        res.status(200).json(appointmentsResponse)
    }))
} 


//TODO: Reschedule Appointment:


// Search Available Appointments:

// Endpoint: GET /appointments/available
// Purpose: Allows users to search for available appointment slots based on criteria such as doctor, date, and time.
// Request Parameters: Doctor ID, date range, time slot, etc.
// Response: List of available appointment slots.