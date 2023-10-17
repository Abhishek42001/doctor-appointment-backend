import { AppointmentInterface } from "../../utils/type_interfaces";
import { AppointmentModel } from "..";

class AppointmentRepository{
    async CreateAppointment(data:AppointmentInterface){
        const appointment=await AppointmentModel.create({
            doctor_id:data.doctor_id,
            patient_id:data.patient_id,
            appointment_datetime:data.appointment_datetime,
            status:data.status
        });
        return appointment;
    }

    async UpdateAppointmentStatus(pk:string,status:string){
         const result =  await AppointmentModel.update({status},{
                where:{
                    patient_id:pk
                },
                returning:true
            })
        if(result[0]>0){
            return result[1][0]
        }
        return null

    }
}

export default AppointmentRepository;