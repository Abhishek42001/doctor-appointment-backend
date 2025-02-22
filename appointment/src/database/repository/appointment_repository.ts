import { AppointmentInterface } from "../../utils/type_interfaces";
import { AppointmentModel } from "..";
import {Op} from 'sequelize-typescript';

class AppointmentRepository{
    async GetAppointmentsByCustomerId(patient_id:string){
        const appointments=await AppointmentModel.findAll({
            where:{
                patient_id:patient_id
            },
            attributes:{
                exclude:['patient_id']
            }
        })
        return appointments;
    }

    async GetAppointmentsByDoctorId(doctor_id:string){
        const appointments=await AppointmentModel.findAll({
            where:{
                doctor_id:doctor_id
            },
            attributes:{
                exclude:['doctor_id']
            }
        })
        return appointments;
    }

    async CreateAppointment(data:AppointmentInterface,patient_id:string){
        //TODO: improve this with transaction concept
        const appointment=await AppointmentModel.create({
            doctor_id:data.doctor_id,
            patient_id:patient_id,
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

    async GetAllAvailableSlots(date:Date){
        const allData= await AppointmentModel.findAll({
            where:{
                appointment_datetime:{
                    [Op.eq]:date.getDay()
                }
            }
        })
    }

     
}

export default AppointmentRepository;