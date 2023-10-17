import { ClinicRepository } from "../../database";
import express from 'express';
import auth from "../middlewares/auth";
import ClinicEndpoints from '../../utils/api_endpoints/clinic_endpoints'
import CatchAsyncError from '../../../../utils/error_handling/catch_async_error';
import { ExpressRequest } from '../../../../utils/types/common_types';
import ClinicService from "../../services/clinic_service";

const ClinicController=(app:express.Express)=>{
    const clinicService=new ClinicService();
    app.get(ClinicEndpoints.CLINIC,auth,CatchAsyncError(async(req:ExpressRequest,res:express.Response,next:express.NextFunction)=>{
        const data=await clinicService.getAllClinics()
        res.status(200).json(data);
    }))

    app.post(ClinicEndpoints.CLINIC,auth,CatchAsyncError(async(req:ExpressRequest,res:express.Response,next:express.NextFunction)=>{
        const body=req.body
        const data=await clinicService.createClinic(body)
        res.status(201).json(data);
    }))

    app.delete(ClinicEndpoints.CLINICWITHPK,auth,CatchAsyncError(async(req:ExpressRequest,res:express.Response,next:express.NextFunction)=>{
        const pk=req.params.pk
        const data=await clinicService.deleteClinic(pk)
        res.status(200).json(data);
    }))
    
    app.patch(ClinicEndpoints.CLINIC,auth,CatchAsyncError(async(req:ExpressRequest,res:express.Response,next:express.NextFunction)=>{
        const user=req.user;
        const data=req.body;
        const updatedData=await clinicService.updateClinic(user._id,data)
        res.status(200).json(updatedData);
    }))

}
export default ClinicController;